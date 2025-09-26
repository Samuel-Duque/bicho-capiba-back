import AuthController from "#controllers/auth_controller";
import router from "@adonisjs/core/services/router";

export default function authRouter(){
    router.group(() => {
        router.post('/login', [AuthController, 'login'])
    })
}