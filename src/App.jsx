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
    // 1. เริ่มต้น Fetch: ให้ Loading เป็น true และ Error เป็น null
    setLoading(true);
    setError(null);

    fetch(`https://api.github.com/users/${username}`)
    .then(res => {
      if (!res.ok) {
        // 2. ตรวจสอบ Status: ถ้าไม่ใช่ 200-299 (เช่น 404) ให้สร้าง Error ออกมา
        throw new Error("User not found");
      }
      return res.json();
    })
    .then(data => {
      // 3. กรณีสำเร็จ: เก็บข้อมูล และปิด Loading
      setGithubData(data);
      setLoading(false);
    })
    .catch(err => {
      // 4. กรณีผิดพลาด: เก็บข้อความ Error และปิด Loading
      setError(err.message);
      setLoading(false);
    })
  }, [username]); // เพิ่ม username ตรงนี้เพื่อให้โหลดใหม่ทุกครั้งที่ชื่อเปลี่ยน

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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