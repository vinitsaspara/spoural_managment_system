import React from 'react'


//  this is not implimented if we want then we implemete.

function AdminUpdateGame() {

  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

    const [input, setInput] = useState({
        fullname: "",
        description: "",
        skills: "",
        location: "",
        gameCatagory: "",
      });
    
      const submitHandler = async (e) =>{
        e.preventDefault();
        try {
            setLoading(true);
    
            const res = await axios.post(`${JOB_API_END_POINT}/post`,input,
                {
                    headers:{
                    "Content-Type": "application/json",
                },
                withCredentials:true
            }
            );
    
            if(res.data.success){
                toast.success(res.data.message);
                navigate('/admin/jobs');
            }
    
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            setLoading(false);
        }
      }

    

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center">
        <form onSubmit={submitHandler} className=" my-8 p-5 border max-w-3xl mx-auto rounded-md shadow-lg border-gray-300">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                className="my-1"
              ></Input>
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="my-1"
              ></Input>
            </div>
            <div>
              <Label>Skills</Label>
              <Input
                type="text"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                className="my-1"
              ></Input>
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="my-1"
              ></Input>
            </div>
            <div>
              <Label>Game Category</Label>
              <Input
                type="text"
                name="gameCatagory"
                value={input.gameCatagory}
                onChange={changeEventHandler}
                className="my-1"
              ></Input>
            </div>    
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin">
                please wait
              </Loader2>{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-10">
              Post New Game
            </Button>
          )}
        </form>
      </div>
    </div>
  )
}

export default AdminUpdateGame