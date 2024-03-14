export default function Singlecard({ data }) {
  return (
    <>
      <div className="card">
        <div className="card-content">
          <span>{data.content}</span>
        </div>
        <div
          className="card-image"
          style={{ backgroundImage: `url(${data?.image})` }}
        ></div>
      </div>
      {data.description.map((point, index) => (
        <p className="description" key={index}>
          {point.endsWith(".") ? point : point + "."}
        </p>
      ))}
    </>
  );
}
