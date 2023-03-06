function ProfilePage(props) {
    return(
        <div className="profile-wrapper">
            <h1>{props.title}</h1>
            <p>
                email: {props.email}<br/>
                username: {props.username}<br/>
                password: {props.password}<br/>
            </p>
        </div>
    ) 
}
export default ProfilePage;