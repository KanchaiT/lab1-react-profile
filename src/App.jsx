import ProfileCard from "./components/ProfileCard"

function App() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1>My Team Portfolio</h1>

        <ProfileCard
           name = 'Kanchai Triyavanich'
           role = 'Student @ CEDT'
           bio = 'Progress, not perfection.'
        />

        <ProfileCard
           name = 'Jane Doe'
           role = 'Guest Developer'
           bio = 'I love coding and learning new things.'
        />
    </div>
  )
}

export default App