
import { useState } from 'react'

function App() {
  const [page, setPage] = useState("Dashboard")
  const [ideas, setIdeas] = useState([])
  const [title, setTitle] = useState("")
  const [features, setFeatures] = useState("")

  function submitIdea(e) {
    e.preventDefault()

    let list = features.split(",").map(f => f.trim())
    let score = 0

    ideas.forEach(idea => {
      idea.features.forEach(f => {
        if (list.includes(f)) {
          score++
        }
      })
    })

    let result = ideas.length
      ? Math.round(score / (ideas.length * list.length) * 100)
      : 0

    let newIdea = {
      title: title,
      features: list,
      similarity: result
    }

    setIdeas([...ideas, newIdea])
    setTitle("")
    setFeatures("")
    setPage("Reports")
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <header className="bg-blue-700 text-white p-5">
        <h1 className="text-2xl font-bold">InnovateCheck</h1>
        <p>Idea Similarity Checker</p>
      </header>

      <div className="flex flex-col md:flex-row">

        <nav className="bg-white p-5 md:w-52">
          {["Dashboard", "Submit Idea", "My Ideas", "Reports"].map(item =>
            <p
              className="p-3 cursor-pointer hover:bg-blue-100"
              onClick={() => setPage(item)}
            >
              {item}
            </p>
          )}
        </nav>

        <main className="flex-1 p-6">

          {page === "Dashboard" && (
            <div>
              <h2 className="text-2xl font-bold">Dashboard</h2>
              <p>Total Ideas: {ideas.length}</p>
            </div>
          )}

          {page === "Submit Idea" && (
            <form onSubmit={submitIdea} className="bg-white p-5 rounded">
              <h2 className="text-xl font-bold mb-4">Submit Idea</h2>

              <input
                className="border p-2 w-full mb-3"
                placeholder="Project Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />

              <textarea
                className="border p-2 w-full mb-3"
                placeholder="Enter features separated by commas"
                value={features}
                onChange={e => setFeatures(e.target.value)}
                required
              />

              <button className="bg-blue-600 text-white p-2 rounded">
                Check Idea
              </button>
            </form>
          )}

          {page === "My Ideas" && (
            <div>
              <h2 className="text-xl font-bold">My Ideas</h2>

              {ideas.map((idea, index) => (
                <div key={index} className="bg-white p-4 m-2">
                  <p>{idea.title}</p>
                  <p>Similarity: {idea.similarity}%</p>
                </div>
              ))}
            </div>
          )}

          {page === "Reports" && (
            <div className="bg-white p-5 rounded">
              <h2 className="text-xl font-bold">Reports</h2>

              {ideas.length > 0 ? (
                ideas.map((idea, index) => (
                  <div key={index} className="mb-3">
                    <p>Project: {idea.title}</p>
                    <p>Similarity: {idea.similarity}%</p>
                    <p>Features: {idea.features.join(", ")}</p>
                  </div>
                ))
              ) : (
                <p>No reports available.</p>
              )}
            </div>
          )}

        </main>
      </div>

      <footer className="bg-gray-800 text-white text-center p-4">
        InnovateCheck © 2026
      </footer>

    </div>
  )
}

export default App
