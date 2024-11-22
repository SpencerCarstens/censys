import { useState } from "react";
import axios from "axios";

interface ApiResponse {
  code: number;
  result: {
    hits: [];
    links: {
      next: string;
      prev: string;
    };
    query: string;
    total: number;
  };
  status: string;
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<ApiResponse["result"]["hits"]>([]);
  const [nextPage, setNextPage] = useState("");

  const fetchResults = async (query: string, cursor: string) => {
    try {
      const response = await axios.get(
        "https://search.censys.io/api/v2/hosts/search",
        {
          params: {
            q: query,
            cursor: cursor,
            per_page: 10,
            virtual_hosts: "EXCLUDE",
            sort: "RELEVANCE",
          },
          headers: {
            Authorization:
              "Basic NGIzNGRhZjctYmE3ZC00MjBiLWIxODQtNzUyNDE5MjhjNmE2OjBoTmdnSXF3enlPdGxuakdWM3lQOHB1MmdBSVJMTWJP",
          },
        }
      );

      const data = response.data as ApiResponse;

      if (cursor === "") {
        // Replace results for a new search
        setResults(data.result.hits);
      } else {
        // Append new results
        setResults((prevResults) => [...prevResults, ...data.result.hits]);
      }

      // Set page cursor
      setNextPage(data.result.links.next);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const handleSearch = () => {
    fetchResults(searchTerm, "");
  };

  const handleLoadMore = () => {
    fetchResults(searchTerm, nextPage);
  };

  return (
    <div className="container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        placeholder="Input search query and hit enter..."
      />

      <div className="results">
        {results.length > 0 && <h2>Hosts</h2>}

        {results.map(
          (
            item: {
              services: [
                {
                  extended_service_name: string;
                  port: number;
                }
              ];
              ip: number;
              dns: {
                reverse_dns: {
                  names: string[];
                };
              };
            },
            index: number
          ) => {
            const protocol = item.services.map(
              ({ extended_service_name, port }) => {
                return `${port}/${extended_service_name}`;
              }
            );

            return (
              <div className="box" key={`${index}-${item.ip}`}>
                <span>
                  {item.ip}{" "}
                  {item.dns?.reverse_dns
                    ? `( ${item.dns?.reverse_dns?.names[0]} )`
                    : ""}
                </span>
                <p>
                  <span>Services ({protocol.length}):</span>{" "}
                  {protocol.join(", ")}
                </p>
              </div>
            );
          }
        )}

        {nextPage !== "" && results.length > 0 && (
          <button onClick={handleLoadMore}>Add More Results</button>
        )}
      </div>
    </div>
  );
};

export default App;
