"use client";

import { useEffect, useRef, useState } from "react";

import { CvData, hasText, normalizeLink } from "@/lib/cv";

type CvPreviewProps = {
  data: CvData;
};

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

export default function CvPreview({ data }: CvPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.64);
  const experiences = data.experiences.filter(hasExperienceContent);
  const education = data.education.filter(hasEducationContent);
  const certifications = data.certifications.filter(hasCertificationContent);
  const hasContent =
    [data.fullName, data.headline, data.summary, data.skills, data.languages]
      .some(hasText) ||
    experiences.length > 0 ||
    education.length > 0 ||
    certifications.length > 0;

  useEffect(() => {
    const node = containerRef.current;

    if (!node) {
      return;
    }

    const resize = () => {
      const width = node.getBoundingClientRect().width;
      setScale(Math.min(width / A4_WIDTH, 1));
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <div
        className="relative mx-auto"
        style={{ width: A4_WIDTH * scale, height: A4_HEIGHT * scale }}
      >
        <article
          className="origin-top-left overflow-hidden bg-white px-[58px] py-[48px] text-neutral-950 shadow-2xl ring-1 ring-black/10"
          style={{
            width: A4_WIDTH,
            height: A4_HEIGHT,
            transform: `scale(${scale})`,
          }}
        >
          {!hasContent ? (
            <div className="flex h-full items-center justify-center text-center">
              <div className="space-y-3">
                <p className="text-[22px] font-bold uppercase">
                  CV Harvard ATS
                </p>
                <p className="text-[13px] text-neutral-500">
                  Completá tus datos para revisar el resultado.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-[13px] leading-[1.38]">
              <header className="mb-5 text-center">
                {hasText(data.fullName) && (
                  <h2 className="text-[24px] font-bold uppercase">
                    {data.fullName}
                  </h2>
                )}
                {hasText(data.headline) && (
                  <p className="mt-1 text-[13px]">{data.headline}</p>
                )}
                {hasText(getContactLine(data)) && (
                  <p className="mt-2 text-[11px] text-neutral-700">
                    {getContactLine(data)}
                  </p>
                )}
              </header>

              {hasText(data.summary) && (
                <PreviewSection title="Perfil profesional">
                  <p>{data.summary}</p>
                </PreviewSection>
              )}

              {experiences.length > 0 && (
                <PreviewSection title="Experiencia">
                  <div className="space-y-3">
                    {experiences.map((experience) => (
                      <div key={experience.id}>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            {hasText(experience.role) && (
                              <h4 className="font-bold">{experience.role}</h4>
                            )}
                            {hasText(
                              [experience.company, experience.location]
                                .filter(hasText)
                                .join(" | "),
                            ) && (
                              <p className="text-[12px] text-neutral-700">
                                {[experience.company, experience.location]
                                  .filter(hasText)
                                  .join(" | ")}
                              </p>
                            )}
                          </div>
                          {hasText(getPeriod(experience)) && (
                            <p className="min-w-[132px] text-right text-[12px] text-neutral-700">
                              {getPeriod(experience)}
                            </p>
                          )}
                        </div>
                        {experience.highlights.some((item) =>
                          hasText(item.text),
                        ) && (
                          <ul className="mt-1 list-disc space-y-0.5 pl-5">
                            {experience.highlights
                              .filter((item) => hasText(item.text))
                              .map((highlight) => (
                                <li key={highlight.id}>{highlight.text}</li>
                              ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </PreviewSection>
              )}

              {education.length > 0 && (
                <PreviewSection title="Formación">
                  <div className="space-y-3">
                    {education.map((item) => (
                      <div key={item.id}>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            {hasText(item.degree) && (
                              <h4 className="font-bold">{item.degree}</h4>
                            )}
                            {hasText(
                              [item.institution, item.location]
                                .filter(hasText)
                                .join(" | "),
                            ) && (
                              <p className="text-[12px] text-neutral-700">
                                {[item.institution, item.location]
                                  .filter(hasText)
                                  .join(" | ")}
                              </p>
                            )}
                          </div>
                          {hasText(getPeriod(item)) && (
                            <p className="min-w-[132px] text-right text-[12px] text-neutral-700">
                              {getPeriod(item)}
                            </p>
                          )}
                        </div>
                        {hasText(item.details) && (
                          <p className="mt-1">{item.details}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </PreviewSection>
              )}

              {hasText(data.skills) && (
                <PreviewSection title="Habilidades">
                  <p>{data.skills}</p>
                </PreviewSection>
              )}

              {hasText(data.languages) && (
                <PreviewSection title="Idiomas">
                  <p>{data.languages}</p>
                </PreviewSection>
              )}

              {certifications.length > 0 && (
                <PreviewSection title="Certificaciones">
                  <div className="space-y-1">
                    {certifications.map((item) => (
                      <p key={item.id}>
                        {[item.name, item.issuer, item.year]
                          .filter(hasText)
                          .join(" | ")}
                      </p>
                    ))}
                  </div>
                </PreviewSection>
              )}
            </div>
          )}
        </article>
      </div>
    </div>
  );
}

function PreviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-4">
      <h3 className="mb-2 border-b border-neutral-950 pb-1 text-[12px] font-bold uppercase">
        {title}
      </h3>
      {children}
    </section>
  );
}

function getContactLine(data: CvData) {
  return [
    data.email,
    data.phone,
    data.location,
    data.linkedin ? normalizeLink(data.linkedin) : "",
    data.website ? normalizeLink(data.website) : "",
  ]
    .filter(hasText)
    .join(" | ");
}

function getPeriod(item: {
  startDate?: string;
  endDate?: string;
  current?: boolean;
}) {
  return [item.startDate, item.current ? "Actualidad" : item.endDate]
    .filter(hasText)
    .join(" - ");
}

function hasExperienceContent(item: CvData["experiences"][number]) {
  return (
    [item.role, item.company, item.location, item.startDate, item.endDate].some(
      hasText,
    ) || item.highlights.some((highlight) => hasText(highlight.text))
  );
}

function hasEducationContent(item: CvData["education"][number]) {
  return [
    item.degree,
    item.institution,
    item.location,
    item.startDate,
    item.endDate,
    item.details,
  ].some(hasText);
}

function hasCertificationContent(item: CvData["certifications"][number]) {
  return [item.name, item.issuer, item.year].some(hasText);
}
