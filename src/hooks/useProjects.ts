import { useState, useEffect } from 'react'

const toKey = (name: string) => escape(name.replace(' ', '_').toLowerCase())

const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/projects.json`)
      .then(response => response.json())
      .then((data) => {
        setProjects(
          Object.entries(data).flatMap(([category, value]) =>
            (value as Project[]).map(({ name, ...other }) => ({
              ...other,
              category,
              key: toKey(name),
              name
            }))
          )
        )
      }).catch(error => console.error(error))
  }, [])

  return projects
}

export default useProjects
