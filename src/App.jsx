import { useState, useEffect } from 'react'
import ProfileCard from "./components/ProfileCard"

function App() {
  const [githubData, setGithubData] = useState(null)
  const username = "KanchaiT"

  const [skills, setSkills] = useState(['React', 'Git'])
  const [newSkill, setNewSkill] = useState("")
  const addSkill = () => {
    if (newSkill.trim() !== ""){
      setSkills([...skills, newSkill]) // สร้าง Array ใหม่จากอันเดิม + ของใหม่
    }
    setNewSkill("")
  }

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(data => {
      setGithubData(data)
    })
    .catch(err => console.error(err))
  }, []) // [] = ให้ทำแค่ครั้งเดียวตอนโหลดหน้าเว็บ

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1>My First React App</h1>

        {githubData ? (
          <ProfileCard
           name = {githubData.name || githubData.login}
           role = "GitHub User"
           bio = {githubData.bio || "No bio available"}
        />
        
        ) : (
          <p>Loading data from GitHub...</p>
        )}

        <h2>Skills</h2>
        <input 
        value={newSkill}
        onChange={(e) => setNewSkill(e.target.value)}
        placeholder = "Add a skill"
        />

        <button onClick={addSkill}>Add</button>

        <ul>
          {skills.map((skill, index) => 
            <li key={index}>{skill}</li>
          )}
        </ul>
        

    </div>
  )
}

export default App