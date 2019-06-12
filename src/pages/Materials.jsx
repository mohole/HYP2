import React from "react";
import "./Rooms.scss";
import axios from 'axios';
import Header from './../components/Header';
import pc from "./../icone/pc.svg";

//render form opened
class Form extends React.Component{
  
    render(){
            return(
                <>
                <form action="#" materiale={this.props.materialid}>
                    <h2>Prenotazione</h2>            
                  {/*  <select>
                    <option value={this.props.classroomid}>{this.props.classroomid}</option>
                    <option value="classe">classe</option>
                    </select>*/}
                    <input type="submit"  value="Get" onClick={this.props.sendMail} />
                </form>
        

                </>
            );
        
        

    }
    
}
class ListItem extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.reservation);
        console.log(this.props.arrayMat);
        this.state={
            clicked:false,
            form:false,
            porco:true,
            avail:true,
            ziocan:0
        };
        
        
        this.openForm=this.openForm.bind(this);
        this.closeForm=this.closeForm.bind(this);
        this.check=this.check.bind(this);
        this.checkX=this.checkX.bind(this);
        this.aggiorna=this.aggiorna.bind(this);

        
    }
    check(){
        this.props.reservation.forEach((reserv)=>{
            if(reserv.material!==null){
                if(reserv.material.id===this.props.keyValue){
                    this.setState({
                        avail:false
                    });
                  }
            }
        })

     }
     checkX(){
        this.props.reservation.forEach((reserv)=>{
            if(reserv.material!==null){
                console.log()
                    if(reserv.material.id===this.props.keyValue && reserv.user.id===JSON.parse(localStorage.getItem('user')).id){       
                        this.setState({
                            porco:false,
                            ziocan:reserv.id
                        });
                      }
                      console.log(`boh${this.state.porco}`);
                
                
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
        this.checkX();
   }

   aggiorna(e){
    e.preventDefault();
    console.log(this.state.ziocan);
    let token=JSON.parse(localStorage.getItem('user')).token;
    axios.put(`https://node.mohole.it/reservationmats/${this.state.ziocan}`, {
       End_date:"2019-06-12 20:04:07"})
        .then((response) => {
            this.setState({
                error:false,
                message:"Materiale prenotato!"
            });
        }).catch((error) => {
            this.setState({
                error:true,
                message:"Ops c'è stato un piccolo problema. Riprovare."
            });
    });
}
  
    
    render(){
        
        if(!this.state.clicked){
            return(
             
                            <li materialid={this.props.keyValue} onClick={this.state.avail?this.openForm:null}><span className={this.state.avail?"free":"noFree"}></span><p><b>{this.props.name}</b></p> <a href="#" className={!this.state.porco?'show':'hidden'} onClick={this.aggiorna}>Back</a> </li>

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
            arrayMaterial:[],
            availableMat:[],
            reservationMat:[],
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
                .then(response =>response.data),
                /*
                .then(response => response.data),
                axios
                .get('https://node.mohole.it/rooms', {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                })*/                
              ]).then(([materiale,resMat]) => {
                  let userMaterial = [];
                resMat.forEach((valore)=>{
                    if(valore.user.id===JSON.parse(localStorage.getItem('user')).id){
                        userMaterial.push(valore.id)
                     }
                })
                this.setState({
                  arrayMaterial:userMaterial,
                  availableMat:materiale,
                  reservationMat:resMat,
                  /*availableClass:classroom,*/
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
    
    let materialId= e.currentTarget.parentNode.getAttribute("materiale");
    let token;
    setTimeout(() => {
      
        if( JSON.parse(localStorage.getItem("user")).name &&
            JSON.parse(localStorage.getItem("user")).email){
                
                let today = new Date();
                let dd = today.getDate();
                let mm = today.getMonth()+1; //As January is 0.
                let yyyy = today.getFullYear();
                let fullDate=`${yyyy}-${mm}-${dd}`;
                let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                //let timeStart=document.querySelector("#start").value;
                let timeEnd= null;
                let startDate=[fullDate,time];
                let endDate=[fullDate,timeEnd];
                
                
                
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
                        let checkMaterial=true;
                        response.data.forEach((valore)=>{
                            if(valore.material.id!==null){
                                if(parseInt(valore.material.id)===parseInt(materialId)){
                                  checkMaterial=false;
                                }
                            }                     
                         });
                         if(checkMaterial===true)  {
                            var bodyParameters = {
                                start_date:`${startDate[0]} ${startDate[1]}`,
                                end_date: `${endDate[0]} ${endDate[1]}`,
                                user: JSON.parse(localStorage.getItem("user")).id,
                                material:materialId
                            }
                            axios.post( 
                            'https://node.mohole.it/reservationmats',
                            bodyParameters,
                            config
                            ).then((response) => {
                                this.setState({
                                    error:false,
                                    message:"Materiale prenotato!"
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
                                message:"il materiale è appena stato prenotato da un altro studente"
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
                    <Header titoloPagina = "Get Back">
                        
                    </Header>
                    <section className="container-room">
                        <p>Caricamento</p>
                    </section>
                </>
                );
        }else{
            return(
                <>
                    <Header titoloPagina= "Get Back">
                        
                    </Header>
                    <section className="container-room">
                        <section className="list-rooms">
                            <section className="headerImg">
                                <img src={pc} alt="pc"/>
                            </section>
                            <p className="subTitle"> <b>LAP TOP</b> </p>
                            <p className={`${show} ${typeMsg}`} >{this.state.message}</p>

                            <ul>                    
                                {
                                    (this.state.availableMat.map((item)=><ListItem  keyValue={item.id}  reservation={this.state.reservationMat} arrayMat={this.state.arrayMaterial} sendMail={this.sendEmail} checkForm={true} key={item.id} {...item}  />))               
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