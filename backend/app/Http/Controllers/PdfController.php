<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf; // Usa la facade de dompdf

class PdfController extends Controller
{
    /**
     * Muestra un PDF de equipamiento usando DomPDF.
     */
    public function equipamiento(Request $request)
    {
        $data = [
            'temporada'             => $request->input('temporada', 'Sin temporada'),
            'categoria'             => $request->input('categoria', 'Sin categoría'),
            'numero_jersey'         => $request->input('numero_jersey', 'N/A'),
            'nombre_jugador'        => $request->input('nombre_jugador', 'N/A'),
            'fecha_nacimiento'      => $request->input('fecha_nacimiento', 'N/A'),
            'edad'                  => $request->input('edad', 'N/A'),
            'domicilio'             => $request->input('domicilio', 'N/A'),
            'nombre_responsable'    => $request->input('nombre_responsable', 'N/A'),
            'telefono_responsable'  => $request->input('telefono_responsable', 'N/A'),
            'casco_marca'           => $request->input('casco_marca', 'N/A'),
            'casco_serie'           => $request->input('casco_serie', 'N/A'),
            'hombreras_marca'       => $request->input('hombreras_marca', 'N/A'),
            'hombreras_serie'       => $request->input('hombreras_serie', 'N/A'),
            'fundas_talla'          => $request->input('fundas_talla', 'N/A'),
            'jersey_talla'          => $request->input('jersey_talla', 'N/A'),
            'jersey_tipo'           => $request->input('jersey_tipo', 'N/A'),
            'reposicion'            => $request->input('reposicion', 'N/A'),
            'fecha_equipamiento'    => $request->input('fecha_equipamiento', 'N/A'),
            'casco_equipo'         => $request->input('casco_equipo', 'N/A'),
            'hombreras_equipo'     => $request->input('hombreras_equipo', 'N/A'),
            'fundas_equipo'        => $request->input('fundas_equipo', 'N/A'),
            'jersey_equipo'        => $request->input('jersey_equipo', 'N/A'),
        ];

        $pdf = Pdf::loadView('pdf.equipamiento', $data);
        return $pdf->stream('Equipamiento de '.$data['nombre_jugador'].'.pdf');
    }
}
