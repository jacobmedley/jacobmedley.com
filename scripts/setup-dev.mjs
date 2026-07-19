import { existsSync, symlinkSync } from "fs";
import { join } from "path";
const target = join(process.cwd(), "images");
const link   = join(process.cwd(), "public", "images");
if (!existsSync(link)) {
  symlinkSync(target, link, "junction");
  console.log("✓ public/images → images/ junction created");
} else {
  console.log("✓ public/images already linked");
}
