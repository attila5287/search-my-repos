import { useEffect, useState } from "react";
import "bootswatch/dist/quartz/bootstrap.min.css";
import "./App.css";
const URL_GITHUB =
  "https://api.github.com/users/attila5287/repos?per_page=80&page=1";
const URL_GITHUB2 =
  "https://api.github.com/users/attila5287/repos?per_page=80&page=2";

function App() {
  const [page1, setPage1] = useState([]);
  const [page2, setPage2] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch(URL_GITHUB)
      .then((res) => res.json())
      .then((data) => {
        setPage1(data);
      });
    fetch(URL_GITHUB2)
      .then((res) => res.json())
      .then((data) => {
        setPage2(data);
      });
  }, [  ]);

  // Calculate filtered results once for efficiency
  const filteredPage1 = page1.filter((repo) => repo.name.toLowerCase().includes(search.toLowerCase()));
  const filteredPage2 = page2.filter((repo) => repo.name.toLowerCase().includes(search.toLowerCase()));
  const filteredCount = filteredPage1.length + filteredPage2.length;

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
      <div className="container-fluid d-flex justify-content-between">
      <div className="d-flex justify-content-center">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <a className="navbar-brand" href="https://github.com/attila5287">
        <img className="rounded-circle" src="https://avatars1.githubusercontent.com/u/42498753?s=60&u=739973fd70454aa533c67bccf17b6aeddcc6361f&v=4" alt="GitHub" /> <strong>attila5287</strong>
      </a>
      </div>
    </nav>
      <h1>
        <i className="fab fa-react fa-spin mx-2"></i>
        Found <span className="text-primary">{filteredCount}</span> out of <span className="text-primary">{page1.length + page2.length}</span>  repos.
      </h1>
      <ul className="list-group mx-1">
      {filteredPage1.map((repo) => (
          <li className="list-group-item py-0" key={repo.id}>
          <i className="fab fa-github mx-1"></i>
          <a className="text-decoration-none line-break" href={repo.html_url}>{repo.name}</a>
          </li>
        ))}
      {filteredPage2.map((repo) => (
          <li className="list-group-item py-0" key={repo.id}>
          <i className="fab fa-github mx-1"></i>
          <a className="text-decoration-none line-break" href={repo.html_url}>{repo.name}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
export default App;
