import VotacionContent from "./VotacionContent"
import VotacionHeader from "./VotacionHeader"

export default function Votacion() {
  return (
    <div>
        <VotacionHeader/> {/* Here goes the back button and the search bar component */}
        <VotacionContent/> {/* Here goes a list of card of listas and the vote buttons */}
    </div>
  )
}