import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarId from "../helpers/generarId.js";

const veterionarioSchema  = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true,
    },
    password :{
        type:String,
        require:true
    },
    email:{
        type: String,
        require:true,
        unique: true,
        trim: true
    },
    telefono:{
        type:String,
        default:null,
        trim: true,
    },
    web:{
        type:String,
        default:null,
    },
    token:{
        type:String,
        default: generarId()
    },
    confirmado:{
        type:Boolean,
        default:false
    }
});

//Hashea el password antes de insertarlo a la BD
veterionarioSchema.pre("save", async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//
veterionarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario,this.password)
};

const Veterinario= mongoose.model("Veterinario",veterionarioSchema);
export default Veterinario;