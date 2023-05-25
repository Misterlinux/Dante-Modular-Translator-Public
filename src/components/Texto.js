
const Forma = (props) =>{

    return(
        <div>
            
          <form onSubmit={props.cercatore} className="row gy-2 my-3 my-sm-5">

            <div className="col-12">
            <div className="form-floating">
            <select name="linguaggio" id="" className="form-select">
                <option value="English rgb(100,210,255)">English</option>
                <option value="French rgb(0,85,255)">French</option>
                <option value="Spanish rgb(255,170,0)">Spanish</option>
                <option value="Italian rgb(77,255,77)">Italian</option>
                <option value="Romanian rgb(204,204,0)">Romanian</option>
                <option value="Portuguese rgb(255,51,51)">Portuguese</option>
                <option value="Ukranian rgb(25,64,255)">Ukranian</option>
                <option value="German rgb(26,0,4)">German</option>
                <option value="Catalan rgb(255,204,102)">Catalan</option>
                <option value="Dutch rgb(179,191,255)">Dutch</option>
                <option value="Arabic rgb(0,153,0)">Arabic</option>
                <option value="Indian rgb(21,128,0)">Indian</option>
                <option value="Chinese rgb(179,0,0)">Chinese</option>
                <option value="Japanese rgb(255,153,153)">Japanese</option>
                <option value="Finnish rgb(153,255,238)">Finnish</option>
            </select>
            <label htmlFor="">Choose your language</label>
            </div>
            </div>

            <div className="input-group">
            <div className="form-floating">
                <input id={props.chiave + "texto"} type="text" className="form-control" 
                       placeholder="search translate" name="word" minLength="3" />
                <label htmlFor={props.chiave + "texto"}>translate text</label>
            </div>

            <div className="input-group-text">
                <input id={props.chiave + "read"} type="checkbox" className="form-check-input" 
                    name="aleatorio" value="random"/>
                <label htmlFor={props.chiave + "read"} className="mx-2">Read-Only</label>
            </div>
            </div>

            <div className="text-center">
            <button className="btn bottone">Submit</button>
            </div>
          </form>

        </div>
    )


}

export default Forma;