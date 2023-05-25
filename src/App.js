import Forma from "./components/Texto";
import "./App.css";
import { useId, useState } from "react";
import { Configuration, OpenAIApi } from "openai";


//We use '' to create a multiple lines of string variable
function App() {

let texto= `
Nel mezzo del cammin di nostra vita \n
mi ritrovai per una selva oscura, \n
ché la diritta via era smarrita. \n
Ahi quanto a dir qual era è cosa dura \n
esta selva selvaggia e aspra e forte \n
che nel pensier rinova la paura! \n
Tant' è amara che poco è più morte; \n
ma per trattar del ben ch'i' vi trovai, \n
dirò de l'altre cose ch'i' v'ho scorte. \n
Io non so ben ridir com' i' v'intrai, \n
tant' era pien di sonno a quel punto \n
che la verace via abbandonai. \n
Ma poi ch'i' fui al piè d'un colle giunto, \n
là dove terminava quella valle \n
che m'avea di paura il cor compunto, \n
guardai in alto e vidi le sue spalle \n
vestite già de' raggi del pianeta \n
che mena dritto altrui per ogne calle. \n
Allor fu la paura un poco queta, \n
che nel lago del cor m'era durata \n`

  const [canto, setCanto] = useState( [] )
  let chiave = useId()

  let colora = []
  let tradotto;
  const [serie, setSerie] = useState(0)

  const versi = new RegExp( /\n/g )
  let cantica = texto.split(versi) 

  //we set up the translation, 
  const configuration = new Configuration({
    apiKey: "__YOUR_OPENAI_KEY",
  });
  const openai = new OpenAIApi(configuration);

  function compile(){
      
    if(canto.length == 0){
      cantica.map(((carta, index)=>{

        if(carta !== "" ){ 
          index = (index -1)/2
          setCanto((x)=> [...x, <div id={index} key={chiave + index} > {carta} </div>] )
        }

      }))
    }
  }
  
  compile()

  //this function is triggered when the form is submitted
  async function traduce(e, lang){

    try{
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt:  `Translate this into ${lang}: ${e}`,
        temperature: 0.3,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });
  
      return response.data.choices[0].text.trim()
  
      }catch(error){
        window.alert("OpenAI error re-try again")
      }
  }


  async function finder(e){
    e.preventDefault()
  
    console.log( tradotto )

    let form= e.target
    let formdata= new FormData(form)
    let finish= Object.fromEntries( formdata.entries())

    let {word, linguaggio, aleatorio } = finish
    colora = linguaggio.split(" ")

    const trova =  new RegExp( "("+ word + ")", 'ig');

    if( !aleatorio ){
  
    for( let x of canto){

      if( trova.test( x.props.children[1] ) ){

        const {key, props } = x
        const {id, children} = props
      
        tradotto = await traduce(children[1], colora[0])

        setCanto((x)=> x.map( (str, index) =>
          (index == id) ? <div id={id} key={key} style={ {backgroundColor: colora[1], color:"white"} } > {tradotto} </div> : str
        ))
      }

    }

    let fine = (!tradotto) ? alert("No matching word found") : console.log("found")

    }else if(aleatorio && serie<= 19){

      const {key, props } = canto[serie]
      const {id, children} = props

      tradotto = await traduce(children[1], colora[0])

      setCanto((x)=> x.map( (str, index) =>
        (index == id) ? <div id={id} key={key} style={ {backgroundColor: colora[1], color:"white"} } > {tradotto} </div> : str
      ))
  
      setSerie((x)=> x + 1 )
    }else{
      alert("Everythin got translated")
    }

  }

  return (
    <div className="container-fluid">

      <div className="row justify-content-center">

        <div className="col-11 background py-2 my-2">

          <div className="row">
            <div className="col-4 col-sm-1 align-self-center">
              <img src="robotdante.jpg" className="img-fluid" alt="page-icon" />
            </div>

            <div className="col-8 text-start ps-0 align-self-center">
              <h1 className="titolo fs-5"> <b>Dante's Modular Translator </b></h1>

              <p className="titolo mb-1">
                Choose a word to translate, or use the read-only option to read verse to verse.
              </p>
            </div>
          </div>

        </div>

        <div className="col-10 col-sm-5">
          <div className="row mt-2 my-sm-2">
            {canto}
          </div>
        </div>
        <div className="col-10 col-sm-4 ">
          
          <Forma cercatore={finder} chiave={chiave} />

        </div>

        <footer className="bottom-0 text-center p-1 bg-dark w-100 footer">
          <span>Code made by Angelo Zarate, check his </span>
          <span><a href="https://codepen.io/misterlinux" className="text-warning">Github,</a></span>
          <span> powered by </span>
          <span><a href="https://platform.openai.com/" className="text-warning">OpenAI</a></span>
          <span></span>
        </footer>
      
      </div>
    </div>
  );
}

export default App;
