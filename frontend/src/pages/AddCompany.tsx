import { useState } from "react"
import api from "../const/api"
import { fetcher } from "../utils/fetcher"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { Link } from "react-router-dom"

export const AddCompany = () => {
  const [name, setName] = useState("")

  const addCompany: UseMutationResult = useMutation({
    mutationFn: (newName) => {
      return fetcher(api.company.post, "POST", { name: newName })
    },
  })

  const handleFormSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    addCompany.mutate(name)
    setName("")
  }

  return (
    <section className="flex flex-col">
						<Link to={"/"} className="text-left mb-6">Back</Link>
      <h1 className="mb-4">Add company</h1>
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" disabled={addCompany.isPending}>
          Submit
        </button>
        {addCompany.isPending && <p>Loading...</p>}
        {addCompany.isError && <p className="text-red-600">Error</p>}
								{addCompany.isSuccess && <p className="text-green-600">Company added</p>}
      </form>
    </section>
  )
}
