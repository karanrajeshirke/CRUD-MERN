const New=()=>
{
    return(
        <>

<form>
  
  <div className="mb-3">
    name:
    <input type="text" className="form-control" name="name"  />
  </div>
  <div className="mb-3">
    email:
    <input type="email" className="form-control"  aria-describedby="emailHelp" name="email" />
  </div>
  <div className="mb-3">
    role:
    <input type="email" className="form-control"  aria-describedby="emailHelp" name="role" />
  </div>
  <button type="text" className="btn btn-primary">Submit</button>
</form>

        
        </>
    )
}

export default New