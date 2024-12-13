import { useEffect, useState } from "react";
import { deleteJob, getJobs } from "../services";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);

  const fetchJobs = async () => {
    const res = await getJobs({ limit, offset: offset*limit });
    if (res.status === 200) {
      const data = await res.json();
      setJobs(data.jobs);
      setCount(data.count);
    } else {
      console.log(res);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchJobs();
  }, [limit, offset]);

  console.log(jobs);

  const handleDeleteJob = async (id) => {
    const res = await deleteJob(id);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      alert("job deleted successfully");
      fetchJobs();
    } else if (res.status === 401) {
      alert("you are not authorized to delete this job");
    } else {
      console.log(res);
      alert("error");
    }
  };

  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <h1>loading...</h1>
      ) : (<>
        <div style={{
          height : "400px",
          width : "400px",
          overflow : "scroll",
          border : "2px solid black",
          margin  : "15px",
          padding : "10px"
        }}>
          {jobs.map((job) => (
            <div key={job._id}>
              <h2>{job.companyName}</h2>
              <p>{job.jobPosition}</p>
              <button onClick={() => navigate(`/editJob/${job._id}`)}>
                Edit
              </button>
              <button onClick={() => handleDeleteJob(job._id)}>delete</button>
            </div>
          ))}
        </div>
        <select value={limit} onChange={(e)=> setLimit(e.target.value)}>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="30">30</option>
        </select>
          <button disabled={offset === 0} onClick={()=>setOffset((offset)=>offset-1)}>prev</button>
          <button disabled={offset * limit +limit >=count} onClick={()=>setOffset((offset)=>offset+1)}>next</button>
        </>
      )}
    </>
  );
}
