import React from "react";
import * as firebase from "firebase";

class Registrations extends React.Component {
    state = {
        participants: [],
        isInEditMode: "false"
    }

    componentWillMount() {
        const tempParticipants = this.state.participants;
        firebase
        .database()
        .ref("registrations")
        .orderByChild("time")
        .on("value", snapshot => {
            snapshot.forEach(child => {
            const childWithUid = { ...child.val(), uid: child.key };
            tempParticipants.push(childWithUid);
            });
        })
        this.setState({participants: tempParticipants})
    }

    render() {
        const handleSubmit = (uid, partID, event) => {
            event.preventDefault();
            
            firebase
            .database()
            .ref("/registrations/"+uid)
            .update({
                name: this.state.participants[partID].name,
                email: this.state.participants[partID].email,
                birthday: this.state.participants[partID].birthday,
                sex: this.state.participants[partID].sex,
                city: this.state.participants[partID].city,
                info: this.state.participants[partID].info,
                hasPayed: this.state.participants[partID].hasPayed
            })
            console.log(this.state.participants[partID].name)
        }

        const handleInputChange = (id, event) => {
            event.preventDefault();

            const name = event.target.name;
            const value = event.target.value;

            let partCopy = JSON.parse(JSON.stringify(this.state.participants))
            partCopy[id][name] = value 
            this.setState({
                participants: partCopy 
        })
            
        }

        const toggleEditMode = (id) => {
            document.querySelector("#fieldset"+id).disabled = !document.querySelector("#fieldset"+id).disabled;
        }
        
        const renderRegistrations = () => {
            if (this.state.participants.length > 0) {
                return (                    
                    <ul className="participantList">
                        {this.state.participants.map((participant, i) => {
                            const formId = "fieldset" + i;
                            return (
                            <li key={i} className="participant">
                                <button onClick={() => toggleEditMode(i)}>Edit!</button>
                                <form className="adminForm" method="post" onSubmit={(e) =>handleSubmit(participant.uid, i, e)}>  
                                    <fieldset id={formId} disabled="disabled">                                                          
                                        <label>
                                        Namn:
                                        <br />
                                        <input
                                        
                                            type="text"
                                            name="name"
                                            value={participant.name}
                                            onChange={(e) => handleInputChange(i,e)}
                                        />
                                        </label>
                                        <label>
                                        Epost:
                                        <br />
                                        <input
                                            value={participant.email}
                                            type="text"
                                            name="email"
                                            onChange={(e) => handleInputChange(i,e)}
                                        />
                                        </label>
                                        <label>
                                        Födelsedatum:
                                        <br />
                                        <input
                                            value={participant.birthday}
                                            type="text"
                                            name="birthday"
                                            onChange={(e) => handleInputChange(i,e)}
                                        />
                                        </label>
                                        <label>
                                        Ort(klubb):
                                        <br />
                                        <input
                                            value={participant.city}
                                            type="text"
                                            name="city"
                                            onChange={(e) => handleInputChange(i,e)}
                                        />
                                        </label>
                                        <label>
                                        Kön
                                        <br />
                                        <select
                                            onChange={(e) => handleInputChange(i,e)}
                                            name="sex"
                                            id="sexSelection"
                                            value={participant.sex}
                                        >
                                            <option name="sex" value="man">
                                            Man
                                            </option>
                                            <option name="sex" value="woman">
                                            Kvinna
                                            </option>
                                        </select>
                                        </label>
                                        <label>
                                        Information:
                                        <br />
                                        <input
                                            type="text"
                                            name="info"
                                            value={participant.info}
                                            onChange={(e) => handleInputChange(i,e)}
                                        />
                                        </label>
                                        <label>
                                        Har betalat:
                                        <br />
                                        <input
                                            type="text"
                                            name="hasPayed"
                                            value={participant.hasPayed}
                                            onChange={(e) => handleInputChange(i,e)}
                                        />
                                        </label>
                                        <br />
                                        <br />
                                        <button>Send data!</button>       
                                    </fieldset>                               
                                </form>
                            </li>
                            )
                        })}
                    </ul>                    
                )
            }
        };

        return <div className="login">{renderRegistrations()}</div>;
  }
}

export default Registrations;
