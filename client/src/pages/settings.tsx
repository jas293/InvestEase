import React, { useState , useEffect } from 'react';
import '../style/dashboard.css'
import '../style/style.css'
import ImageUploader from 'react-image-upload'
import 'react-image-upload/dist/index.css'


type SettingsTpe = {
    name: String,
    phoneNumber: Number,
    email: String,
    dob: String
}

export const Settings: React.FC = () => {

    const [settingsInfo, setSettingsInfo] = useState<SettingsTpe>({
        name: '',
        phoneNumber: 0,
        email: '',
        dob: '',
    })

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        // When the component mounts, add a class to the container to hide the half circle
        document.querySelector('.container')?.classList.add('hide-half-circle');

        getCurrentUserInfo();
    
        // When the component unmounts, remove the class
        return () => {
          document.querySelector('.container')?.classList.remove('hide-half-circle');
        };
    }, []);

    const getCurrentUserInfo: Function = () => {
        const url = 'http://localhost:5000/getUser/1aa774d1f1454c4bbd1452df8e2160dc';
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };

        fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log("Result of user");
            console.log(result);
            const tempSettingsInfo: SettingsTpe = {
                name: result.name,
                email: result.email,
                dob: result.dob,
                phoneNumber: result.phone
            }
            setUserInfo(result);
            setSettingsInfo(tempSettingsInfo);
        });

    }
    

    function getImageFileObject(imageFile: any) {
        console.log({ imageFile })
      }
    
      function runAfterImageDelete(file: any) {
        console.log({ file })
      }

    return (
        <div className="dashboard">
      {/* <aside className="sidebar">
        <header className="sidebar-header">
          <h2>Menu</h2>
        </header>
        <nav>
          <ul>
            <li>Home</li>
            <li>Dashboard</li>
            <li>News</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside> */}
      <main className="main-content-settings">
        <header className="header">
            <h1>
                <i className="fa fa-cog" aria-hidden="true" style={{marginRight: '1rem'}}></i>
                Settings
            </h1>
            <div className="user-info">Welcome, {settingsInfo.name.toString()?.split(" ").at(0)}!</div>
        </header>
        <section id='settings-container-div'>
            <div id='settings-heading'>
                <h2 id='settings-heading-text'>Account Settings</h2>
            </div>
            <div id='settings-form-container'>
                <div id='settings-name-photo-container' className='settings-container'>
                    <div id='settings-name-container' className='input-container'>
                        <label>Name</label>
                        <input name="name" value={settingsInfo.name?.toString()} onChange={(e) => {
                            setSettingsInfo({
                                ...settingsInfo,
                                name: e.target.value
                            })
                        }} />
                    </div>
                    <div id='settings-photo-container'>
                        <ImageUploader
                            onFileAdded={(img: any) => getImageFileObject(img)}
                            onFileRemoved={(img: any) => runAfterImageDelete(img)}
                            style={{ minHeight: '5rem', minWidth: '5rem' }}
                        />
                    </div>
                </div>
                <div id='settings-email-container' className='settings-container'>
                    <div id='settings-email-div' className='input-container'>
                        <label>Email Address</label>
                        <input name="email" value={settingsInfo.email?.toString()} onChange={(e) => {
                            setSettingsInfo({
                                ...settingsInfo,
                                email: e.target.value
                            })
                        }} />
                    </div>
                    {/* <div id='settings-email-verified'>

                    </div> */}
                </div>
                <div id='settings-contact-number-container' className='settings-container'>
                    <div id='settings-phone-container' className='input-container'>
                        <label>Phone Number</label>
                        <input name="phone" value={Number(settingsInfo.phoneNumber)} onChange={(e) => {
                            setSettingsInfo({
                                ...settingsInfo,
                                phoneNumber: Number(e.target.value)
                            })
                        }} />
                    </div>
                    {/* <div id='settings-photo-container'>

                    </div> */}
                </div>
                <div id='settings-dob-container' className='settings-container'>
                    <div id='settings-dob-container' className='input-container'>
                        <label>Date of Birth</label>
                        <input name="dob" value={settingsInfo.dob?.toString()} onChange={(e) => {
                            setSettingsInfo({
                                ...settingsInfo,
                                dob: e.target.value
                            })
                        }} />
                    </div>
                    {/* <div id='settings-photo-container'>

                    </div> */}
                </div>
                <div id='settings-save-container' className='settings-container'>
                    <div id='settings-save' className='input-container'>
                        <input type='button' name="save" value='Save' onClick={() => {
                            const userPayload = {
                                ...userInfo,
                                name: settingsInfo.name,
                                email: settingsInfo.email,
                                dob: settingsInfo.dob,
                                phone: settingsInfo.phoneNumber
                            }

                            console.log("User info payload")
                            console.log(userPayload)
                            console.log({"user": userPayload})

                            // const userId = <getUserId>
                            // const url = 'http://localhost:5000/updateUser/' + userId
                            const url = 'http://localhost:5000/updateUser/1aa774d1f1454c4bbd1452df8e2160dc';
                            let myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/json");
                            
                            const requestOptions = {
                                method: 'PUT',
                                headers: myHeaders,
                                body: JSON.stringify({"user": userPayload}),
                                redirect: 'follow'
                            };

                            fetch(url, requestOptions)
                            .then((response) => response.json())
                            .then((result) => {
                                console.log("PUT result")
                                console.log(result);
                            })
                        }} />
                    </div>
                    <div id='settings-cancel' className='input-container'>
                        <input type='button' name="cancel" value='Cancel' onClick={() => {
                            setSettingsInfo({
                                name: userInfo.name || "",
                                phoneNumber: userInfo.phone || 0,
                                email: userInfo.email || "",
                                dob: userInfo.dob || ""
                            })
                        }} />
                    </div>
                    {/* <div id='settings-photo-container'>

                    </div> */}
                </div>
            </div>
        </section>
      </main>
    </div>
    )
}