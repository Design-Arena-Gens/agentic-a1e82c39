export default function Slide({ slide }){
  return (
    <div className="slide" role="group" aria-roledescription="slide">
      <h1 className="title">{slide.title}</h1>
      {slide.subtitle ? <div className="subtitle">{slide.subtitle}</div> : null}
      <div className="content">
        {Array.isArray(slide.points) ? (
          <ul>
            {slide.points.map((p, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </ul>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: slide.points || '' }} />
        )}
      </div>
    </div>
  );
}
