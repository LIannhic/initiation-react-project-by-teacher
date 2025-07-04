

export default function Search({ search, setSearch }) {
    function handleSearch(e){
        const keyword = e.target.value;
        setSearch(keyword);
    }

    return (
      <div className="search-container">
        <hr></hr>
        <label>Rechercher</label><br/>
        <input
          type="text"
          placeholder="Search by name or phone number"
          value={search}
          onChange={(e) => handleSearch(e)}
        />
      </div>
    )
}