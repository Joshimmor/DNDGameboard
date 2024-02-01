
import React from 'react'

import Map from "@/app/Components/Map"

 
// export default function Page() {
//   const router = useRouter()
//   return <p>Post: {router.query.slug}</p>
// }

export default function page({params}) {

  return (
        <>
            <Map gameid={params.id}/>
        </>
  )
}

