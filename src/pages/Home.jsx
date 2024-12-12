import { useEffect, useState } from "react";
import { deleteJob, getJobs } from "../services";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    const res = await getJobs();
    if (res.status === 200) {
      const data = await res.json();
      setJobs(data);
    } else {
      console.log(res);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchJobs();
  }, []);
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
      ) : (
        jobs.map((job) => (
          <div key={job._id}>
            <h2>{job.companyName}</h2>
            <p>{job.jobPosition}</p>
            <button onClick={() => navigate(`/editJob/${job._id}`)}>
              Edit
            </button>
            <button onClick={() => handleDeleteJob(job._id)}>delete</button>
          </div>
        ))
      )}
    </>
  );
}
