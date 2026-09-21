// Deterministic checks of the documentation manifest against this checkout.
// Run after npm run build. --manifest prints the resolved examples for UI QA.
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import ts from 'typescript'
import assert from 'node:assert/strict'

const root=process.cwd()
const css=fs.readdirSync('.next/static/css').filter(file=>file.endsWith('.css')).map(file=>fs.readFileSync(`.next/static/css/${file}`,'utf8')).join('\n')
const modules=new Map()
function load(name){
  const file=path.resolve(root,name)
  if(modules.has(file))return modules.get(file)
  if(file.endsWith('.json'))return JSON.parse(fs.readFileSync(file,'utf8'))
  if(file.endsWith('.css'))return new Proxy({},{get:(_,key)=>{
    if(key==='__esModule')return false
    const match=css.match(new RegExp(`QuietPrism_${String(key)}__[\\w-]+`))
    assert(match,`Unresolved CSS module class ${String(key)}`)
    return match[0]
  }})
  const exports={}
  modules.set(file,exports)
  const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true,target:ts.ScriptTarget.ES2022}}).outputText
  vm.runInNewContext(code,{exports,require:(request)=>{
    let target=request.startsWith('@/')?request.slice(2):path.relative(root,path.resolve(path.dirname(file),request))
    if(!path.extname(target))target+='.ts'
    return load(target)
  }},{filename:file})
  return exports
}
const {catalog,tokenNames}=load('app/design-system/catalog.ts')
if(process.argv.includes('--manifest')){
  console.log(JSON.stringify(catalog))
}else{
  const errors=[]
  const ids=new Set()
  let examples=0
  for(const pattern of catalog){
    if(ids.has(pattern.id))errors.push(`Duplicate id ${pattern.id}`)
    ids.add(pattern.id)
    if(!pattern.examples.length)errors.push(`Empty examples: ${pattern.id}`)
    for(const source of pattern.sources)if(!fs.existsSync(source))errors.push(`Missing source ${source} (${pattern.id})`)
    for(const example of pattern.examples){
      examples++
      if(!fs.existsSync(path.join('out',example.route,'index.html')))errors.push(`Missing route ${example.route}`)
      if(!example.selector)errors.push(`Empty locator ${pattern.id}`)
    }
  }
  console.log(JSON.stringify({patterns:catalog.length,examples,tokens:tokenNames.length,errors},null,2))
  if(errors.length)process.exitCode=1
}
