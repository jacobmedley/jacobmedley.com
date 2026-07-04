import { cn } from '@/lib/utils'
import { type Project } from '@/lib/data/projects'

interface WorkCardProps {
  project: Project
  reverse?: boolean
  /** Legacy wraps the closing hr in a .mt-4 div on some cards (webmd, bee) */
  closingHrSpacer?: boolean
  onOpen?: (id: string) => void
}

/**
 * Legacy .work-item editorial row (components/section-work-v2.html):
 * full-width image button + title/summary column, alternating via
 * flex-row-reverse.
 */
export default function WorkCard({
  project,
  reverse = false,
  closingHrSpacer = false,
  onOpen,
}: WorkCardProps) {
  const open = () => onOpen?.(project.id)

  return (
    <div className="work-item py-2 lg:py-6 2xl:py-12">
      <div className={cn('row items-start 2xl:items-center', reverse && 'flex-row-reverse')}>
        <div className="col-24 col-lg-12 mb-12 lg:mb-0">
          <button type="button" className="btn p-0 m-0" onClick={open}>
            {project.image && (
              // eslint-disable-next-line @next/next/no-img-element -- legacy parity: native img, natural aspect
              <img
                loading="lazy"
                src={project.image}
                alt={project.title}
                className="img-fluid rounded-2xl shadow-[var(--shadow-bs-lg)] btn-art"
              />
            )}
          </button>
        </div>

        <div className="col-24 col-lg-12">
          <h4 className="h2">{project.title}</h4>
          <p className="h5">{project.subtitle}</p>
          <hr className="solid-center" />
          <p className="h4">Summary:</p>
          <p>{project.summary}</p>

          <div className="row text-center md:text-left">
            <div className="col-24">
              <button
                type="button"
                className="btn btn-lg btn-second-dark rounded-full"
                onClick={open}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- animated gif, legacy asset */}
                <img
                  loading="lazy"
                  src="/images/the-eye-third-reverse.gif"
                  alt=""
                  width={36}
                  className="mix-blend-screen -mt-2 inline-block"
                  role="presentation"
                  aria-hidden="true"
                />{' '}
                Case Study
              </button>
            </div>
          </div>
          {/* legacy wraps some closing hrs in a .mt-4 div; net effect is +4px */}
          <hr className={closingHrSpacer ? 'solid-center mt-5' : 'solid-center'} />
        </div>
      </div>
    </div>
  )
}
