export const ContactMe = () => {
    return <form style={{display: "grid", gridTemplateColumns: "50% 50%", width: "100%"}}>
        <section>
            <FormItem title="First Name" />
            <FormItem title="Last Name" />
            <FormItem title="Email" />
        </section>
        <section>
            <FormItem title="Message" type="textField" />
            <button style={{width: "100%", height: "10%"}}>Send Message</button>
        </section>
    </form>
}

const FormItem = ({title, type='text'}:{title:string, type?:'text'|'textField'}) => {
    return <div style={{display: 'grid', gridTemplateRows: "auto auto"}}>
        <h2>{title}</h2>
        {type == 'text' ? <input /> : <textarea style={{height: "20vh"}} />}
    </div>
}