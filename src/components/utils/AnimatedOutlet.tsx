import { useState } from "react"
import { useOutlet } from "react-router"

const AnimatedOutlet: React.FC = () => {
    let outlet = useOutlet()
    let [_outlet] = useState(outlet)
    return <>{_outlet}</>
}

export default AnimatedOutlet