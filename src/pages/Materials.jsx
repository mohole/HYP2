import React from "react";
import "./Rooms.scss";
import axios from 'axios';

class Form extends React.Component{
  
    render(){
            return(
                <>
                <form action="#" classroom={this.props.materialid}>
                    <h2>Prenotazione</h2>

                    <select action="#" classroom={this.props.classroomid}></select>
                    
                    <input type="submit"  value="Prenota" onClick={this.props.sendMail} />
                </form>
        
        
                </>
            ); 
        
        

    }
    
}
class ListItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            clicked:false,
            form:false,
            avail:true
        };
        
        
        this.openForm=this.openForm.bind(this);
        this.closeForm=this.closeForm.bind(this);
        this.check=this.check.bind(this);
        
    }
    check(){
        this.props.reservation.map((reserv)=>{
            if(reserv.room!==null){
                if(reserv.room.id===this.props.keyValue){
                    this.setState({
                        avail:false
                    });
                  }
            }
        })

     }
    openForm(e){
        document.querySelector("ul").scrollTo(0, Math.abs( e.currentTarget.offsetTop-115));      
        this.setState({
            clicked:true
        });
    }
    closeForm(){
        this.setState({
            clicked:false
        });
    }

   componentWillMount(){
        this.check();
   }
  
    
    render(){
        
        if(!this.state.clicked){
            
            return(
                 <li materialid={this.props.keyValue} onClick={this.state.avail?this.openForm:null}><span className={this.state.avail?"free":"noFree"}></span><p><b>{this.props.name}</b></p>{/*  {this.props.checkForm ?<a href="#" materialid={this.props.keyValue} onClick={this.openForm} >Prenota</a>:""} */}</li>
               
            );
        }else{
            return(
                <li className="formOpen">
                    <div className="title">
                    <span className={this.state.avail?"free":"noFree"}></span><p><b>{this.props.name}</b></p> <a href="#" onClick={this.closeForm} >X</a>
                    </div>   
                    <Form sendMail={this.props.sendMail} materialid={this.props.keyValue} />
                
                
                </li>
               
            );
        }
        
    }
}


class Materials extends React.Component{
    constructor(props){
        super(props);
        this.state={
            availableMats:[],
            reservationMats:[],
            loading: true,
            error:false,
            message:''
            
        };
        this.avail=this.avail.bind(this);
        this.reser=this.reser.bind(this);
        this.sendEmail=this.sendEmail.bind(this);
        this.formatDate=this.formatDate.bind(this);
        this.setAll=this.setAll.bind(this);
        this.setAll();
        

        
    }
    setAll(){
        let token;
        setTimeout(() => {
            if(localStorage.getItem('user')){
                token=JSON.parse(localStorage.getItem('user')).token;
            }
       
            Promise.all([
                axios
                .get('https://node.mohole.it/materials', {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                })
                .then(response =>response.data),
                axios
                .get('https://node.mohole.it/reservationmats', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                })
                .then(response => response.data)
              ]).then(([classroom,resMats]) => {
                this.setState({
                  availableMats:classroom,
                  reservationMats:resMats,
                  loading: false
                 
                });
                

               
              });
            
      
        
        }, 1);
    }
    avail(){
        this.setState({
            available:true,
            form:true
        });
    }
    reser(){
        this.setState({
            available:false,
            form:false
        });
    }
    
    async componentDidMount() {
        
      
        

    }
   //eseguito dal componente Form
   formatDate(allDate){
        let endIndex=allDate.length;
        let spaceIndex=allDate.search("T");
        let strDate=allDate.slice(0,spaceIndex);
        let strTime=allDate.slice(spaceIndex+1,endIndex);
        let arr=[strDate,strTime];
        return arr;
    }
    sendEmail(e){
    e.preventDefault(); 
    
    let roomId= e.currentTarget.parentNode.getAttribute("classroom");
    let token;
    let checkRoom=true;
    setTimeout(() => {
      
        if(document.querySelector("#start").value &&
            document.querySelector("#end").value &&
            JSON.parse(localStorage.getItem("user")).name &&
            JSON.parse(localStorage.getItem("user")).email){
                //creare funzione
                
                let startDate=this.formatDate(document.querySelector("#start").value);
                let endDate=this.formatDate(document.querySelector("#end").value);
                
                
                if(document.querySelector("#start").value>document.querySelector("#end").value){
                    this.setState({
                        error:false,
                        message:"Controlla che la data e l'orario di fine prenotazione sia maggiore di quella d'inizio"
                    });
                }else{
                    token=JSON.parse(localStorage.getItem('user')).token;
                    var config = {
                        headers: {'Authorization': "bearer " + token}
                    };
                    axios.get('https://node.mohole.it/reservationmats', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                    })
                    .then(response=> {
                        response.data.map((valore)=>{
                            if(valore.room.id!==null){
                                if(parseInt(valore.room.id)===parseInt(roomId)){
                                  checkRoom=false;
                                }
                            }                     
                         });
                         if(checkRoom===true)  {
                            var bodyParameters = {
                                start_date:`${startDate[0]} ${startDate[1]}`,
                                end_date: `${endDate[0]} ${endDate[1]}`,
                                student: JSON.parse(localStorage.getItem("user")).id,
                                room:roomId,
                                conferma: "inattesa"
                            }
                            axios.post( 
                            'https://node.mohole.it/reservationmats',
                            bodyParameters,
                            config
                            ).then((response) => {
                                /* await strapi.plugins['email'].services.email.send({
                                    to:JSON.parse(localStorage.getItem("user")).email, 
                                    from: 'lomba.nicolo@gmail.com',
                                    replyTo: 'no-reply@strapi.io',
                                    subject: 'Use strapi email provider successfully',
                                    text: 'Hello world!',
                                    html: 'Hello world!'
                                  }); */
                                this.setState({
                                    error:false,
                                    message:"Prenotazione inviata. Riceverai una conferma via e-mail"
                                });
                                this.setAll();
                            

                                window.location.reload()
                            }).catch((error) => {
                                this.setState({
                                    error:true,
                                    message:"Ops c'è stato un piccolo problema. Riprovare."
                                });
                            
                           // window.location.reload()
                            });  
                        }else{
                            this.setState({
                                error:true,
                                message:"l'aula è appena stata prenotata"
                            });
                            
                        }    

                    })
                        .catch((error)=>{
                            this.setState({
                                error:true,
                                message:"Errore. Riprovare"
                            });
                            /* window.location.reload() */
                        });
     
                }
                
                
            }else{
                this.setState({
                    error:true,
                    message:"ci sei moholto vicino. Finisci di compilare i dati "
                });
            }
       
    }, 1);
    
}
//fine funzioni form
    
    render(){
        let show="hidden";
        let typeMsg;
        if(this.state.message!==''){
            show="show";
            if(this.state.error){
                typeMsg="error";
            }else{
                typeMsg="success"
            }
        }
        if(this.state.loading===true){
            return(
                <>
                    <header>
                        <h2>LAP TOP</h2>
                    </header>
                    <section className="container-room">
                        <p>Caricamento</p>
                    </section>
                </>
                );
        }else{
            return(
                <>
                    <header>
                        <h2>MATERIALI</h2>
                    </header>
                    <section className="container-room">
                        <section className="list-rooms">
                            <section className="headerImg">
                                <p></p>
                            </section>
                            <p className="subTitle"> <b>LAP TOP</b> </p>
                            <p className={`${show} ${typeMsg}`} >{this.state.message}</p>
                            <ul>
                                {
                                    (this.state.availableMats.map((item)=><ListItem  keyValue={item.id} reservation={this.state.reservationMats} sendMail={this.sendEmail} checkForm={true} key={item.id} {...item} />))               
                                }
                            
                            </ul>
                        </section>
                    </section>
                </>
                );
            
        }



        
    }
}

export default Materials;