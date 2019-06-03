import React from "react";
import "./Rooms.scss";
import axios from 'axios';

class Form extends React.Component{
  
    render(){
            return(
                <>
                <form action="#" classroom={this.props.classroomid}>
                    <h2>Prenotazione</h2>
                    <section className="start-box">
                        <label htmlFor="start">Inizio</label>
                        <input id="start" type="datetime-local" name="startdate" required></input>
                    </section>
                    <section className="end-box">
                        <label htmlFor="end">Fine</label>
                        <input id="end" type="datetime-local" name="enddate" required></input>
                    </section>
                    <label className="titleNote" htmlFor="note">Motivo</label>
                    <textarea name="note" id="note" cols="30" rows="5" required></textarea>
                    
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
                 <li classroomid={this.props.keyValue} onClick={this.state.avail?this.openForm:null}><span className={this.state.avail?"free":"noFree"}></span><p><b>{this.props.name}</b></p>{/*  {this.props.checkForm ?<a href="#" classroomid={this.props.keyValue} onClick={this.openForm} >Prenota</a>:""} */}</li>
               
            );
        }else{
            return(
                <li className="formOpen">
                    <div className="title">
                    <span className={this.state.avail?"free":"noFree"}></span><p><b>{this.props.name}</b></p> <a href="#" onClick={this.closeForm} >X</a>
                    </div>   
                    <Form sendMail={this.props.sendMail} classroomid={this.props.keyValue} />
                
                
                </li>
               
            );
        }
        
    }
}


class Rooms extends React.Component{
    constructor(props){
        super(props);
        this.state={
            availableClass:[],
            reservationClass:[],
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
                .get('http://node.mohole.it:1337/rooms', {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                })
                .then(response =>response.data),
                axios
                .get('http://node.mohole.it:1337/reservationrooms', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                })
                .then(response => response.data)
              ]).then(([classroom,resClass]) => {
                this.setState({
                  availableClass:classroom,
                  reservationClass:resClass,
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
            document.querySelector("#note").value &&
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
                    axios.get('http://node.mohole.it:1337/reservationrooms', {
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
                            'http://node.mohole.it:1337/reservationrooms',
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
                        <h2>Aule Libere</h2>
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
                        <h2>Aule Libere</h2>
                    </header>
                    <section className="container-room">
                        <section className="list-rooms">
                            <section className="headerImg">
                                <p></p>
                            </section>
                            <p className="subTitle"> <b>AULE</b> </p>
                            <p className={`${show} ${typeMsg}`} >{this.state.message}</p>
                            <ul>
                                {
                                    (this.state.availableClass.map((item)=><ListItem  keyValue={item.id} reservation={this.state.reservationClass} sendMail={this.sendEmail} checkForm={true} key={item.id} {...item} />))               
                                }
                            
                            </ul>
                            <section className="scroll"><p>scrolla</p></section>
                        </section>
                    </section>
                </>
                );
            
        }



        
    }
}

export default Rooms;