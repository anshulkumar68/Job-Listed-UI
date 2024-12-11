import { useEffect, useState } from "react";
import { getJobs } from "../services";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchJobs = async () => {
      const res = await getJobs();
      if (res.status === 200) {
        const data = await res.json();
        setJobs(data);
      } else {
        console.log(res);
      }
      setLoading(false)
    };
    fetchJobs();
  }, []);
  console.log(jobs);

  const navigate = useNavigate()

  return (
    <>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        jobs.map((job) => (
          <div key={job.id}>
            <h2>{job.companyName}</h2>
            <p>{job.jobPosition}</p>
            <button onClick={()=> navigate(`/editJob/${job.id}`)}>Edit</button>
          </div>
        ))
      )}
    </>
  );
}
