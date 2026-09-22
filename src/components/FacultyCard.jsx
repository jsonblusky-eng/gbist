/** Faculty profile card. Handles the "coming soon" placeholder state. */
export default function FacultyCard({ member }) {
  const isCEO = member.isCEO;
  
  return (
    <article className={`card card-hover overflow-hidden ${isCEO ? 'ring-2 ring-teal' : ''}`}>
      <div className="aspect-square w-full overflow-hidden bg-ice">
        <img
          src={member.photo}
          alt={member.photoAlt || `Photo of ${member.name}`}
          loading="lazy"
          className="img-zoom h-full w-full object-cover"
        />
        {isCEO && (
          <div className="absolute top-3 right-3">
            <span className="bg-teal text-white text-xs font-semibold px-2 py-1 rounded-full">CEO</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-heading text-base font-semibold text-navy">{member.name}</h3>
        <p className="mt-0.5 text-sm font-medium text-teal">{member.designation}</p>
        {member.qualification && (
          <p className="mt-2 text-xs leading-relaxed text-muted">{member.qualification}</p>
        )}
        {member.department && (
          <p className="mt-1 text-xs leading-relaxed text-muted">{member.department}</p>
        )}
      </div>
    </article>
  );
}
