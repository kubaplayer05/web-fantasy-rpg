import Input from "../components/Input.tsx";
import Button from "../components/Button.tsx";

export default function Register() {

    return (
        <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2">
            <form className="flex flex-col gap-6 bg-gray-800 p-8 rounded-lg">
                <div className="flex flex-col gap-2">
                    <label htmlFor="username" className="text-gray-300">Username</label>
                    <Input placeholder="Warrior 123..." id="username"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="username" className="text-gray-300">Password</label>
                    <Input placeholder="Your password..." id="username" type="password"/>
                </div>
                <Button>Submit</Button>
            </form>
        </div>
    )
}