const [viewedMovies, setViewedMovies] = useState([])

const fetchViewedMovies = async () => {
	try {
    const moviesArr = []
		const allMovies = await Firebase.database.collection('viewedMovies')
		//there are methods that come with this. You can console log to see.
		const querySnapshot = await viewedMoviesRef.get()
		//querySnapshot we are iterating through each movie
		querySnapshot.forEach(doc => {
      console.log(doc.id, ' => ', doc.data())
      moviesArr.push(doc.data())
		})
    setViewedMovies(moviesArr)
	} catch(error){
	
	}
}