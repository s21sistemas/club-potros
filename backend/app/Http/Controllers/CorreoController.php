<?php

namespace App\Http\Controllers;

use App\Mail\AlertaMailable;
use App\Mail\CrearUsuarioMailable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class CorreoController extends Controller
{
    public function enviar(Request $request)
    {
        $request->validate([
            'correo' => 'required|email',
            'asunto' => 'required|string',
            'mensaje' => 'required|string',
            'nombre_tutor' => 'required|string',
        ]);

        try {
            Mail::to($request->correo)->send(
                new AlertaMailable($request->asunto, $request->mensaje, $request->nombre_tutor)
            );

            return response()->json(['message' => 'Correo enviado correctamente']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Hubo un error al enviar el correo',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function agregarUsuario(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string',
            'celular' => 'required|string',
            'ocupacion' => 'required|string',
            'correo' => 'required|email',
            'password' => 'required',
        ]);

        try {
            Mail::to($request->correo)->send(
                new CrearUsuarioMailable($request->nombre, $request->celular, $request->ocupacion, $request->correo, $request->password)
            );

            return response()->json(['message' => 'Correo enviado correctamente']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Hubo un error al enviar el correo',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
