import { useMutation, useQuery } from "@tanstack/react-query"
import { Company } from "../types/api"
import { fetcher } from "../utils/fetcher"
import api from "../const/api"
import { useNavigate } from "react-router"

export const Companies = () => {
  const navigate = useNavigate()

  const deleteCompany = useMutation({
    mutationFn: (id: string) => fetcher(`${api.company.delete}${id}`, "DELETE"),
    onSettled: () => companies.refetch(),
  })

  const handleAddCompany = () => navigate("/company/add")

  const companies = useQuery<Company[]>({
    queryKey: ["company"],
    queryFn: () => fetcher(api.company.get, "GET"),
  })

  const handleDelete = (id: string) => {
    deleteCompany.mutate(id)
  }

  return (
    <>
      <h1>Companies</h1>
      {companies.isLoading && <p>Loading...</p>}
      {companies.isError && <p>Error</p>}
      {companies.isSuccess && (
        <>
          <ul>
            {companies.data.map((company) => (
              <>
                <article
                  className="flex justify-between items-center gap-4 bg-gray-300 px-4 py-2 rounded-xl mt-2"
                  key={company.id}
                >
                  <li key={company.id} className="font-semibold">
                    {company.name}
                  </li>
                  <div>
                    <button
                      className="mr-2"
                      onClick={() => navigate(`/company/${company.id}`)}
                    >
                      View
                    </button>
                    <button onClick={() => handleDelete(company.id)}>
                      Delete
                    </button>
                  </div>
                </article>
              </>
            ))}
          </ul>
        </>
      )}
      <button
        onClick={handleAddCompany}
        disabled={companies.isError ? true : false}
      >
        Add company
      </button>
    </>
  )
}
