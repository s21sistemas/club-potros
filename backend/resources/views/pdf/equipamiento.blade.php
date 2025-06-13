<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Control de Utilería - Club Potros - Jugador: {{ $nombre_jugador }}</title>
    <style>
        @page {
            margin: 20mm;
            size: A4;
        }

        body {
            font-family: Arial, sans-serif;
            font-size: 10px;
            line-height: 1.4;
            color: #000;
            margin: 0;
            padding: 0;
        }

        .header {
            width: 100%;
            margin-bottom: 10px;
            border-bottom: 2px solid #e1251b;
            padding-bottom: 10px;
            position: relative;
        }

        .header-content {
            width: 100%;
        }

        .logo {
            position: absolute;
            left: 0;
            top: 0;
            width: 80px;
            height: 80px;
        }

        .club-info {
            text-align: center;
            padding-left: 80px;
            padding-right: 80px;
        }

        .club-name {
            font-size: 16px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 5px;
            line-height: 1.2;
            color: #e1251b;
        }

        .club-address {
            font-size: 11px;
            margin-bottom: 15px;
        }

        .clear {
            clear: both;
        }

        .title {
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            margin: 20px 0 15px 0;
            text-transform: uppercase;
            color: #e1251b;
        }

        .section-title {
            font-size: 13px;
            font-weight: bold;
            margin: 20px 0 12px 0;
            text-transform: uppercase;
            border-bottom: 2px solid #333;
            padding-bottom: 3px;
            color: #333;
            background-color: #f5f5f5;
            padding: 5px 0 3px 0;
            text-align: center;
        }

        .signature-line {
            border-bottom: 1px solid #000;
            height: 40px;
            margin-bottom: 5px;
        }

        .form-row {
            width: 100%;
            margin-bottom: 10px;
        }

        .form-group {
            margin-bottom: 0px;
        }

        .form-group-inline {
            width: 48%;
            float: left;
            margin-right: 2%;
        }

        .form-label {
            font-weight: bold;
            margin-bottom: 3px;
        }

        .form-field {
            border-bottom: 1px solid #000;
            display: inline-block;
            min-width: 160px;
            margin: 0 3px;
            font-size: 13px;
            letter-spacing: 1px;
            padding: 0 7px;
        }

        .form-field-short {
            min-width: 20px;
        }

        .equipment-list {
            margin: 15px 0;
        }

        .equipment-item {
            margin-bottom: 15px;
            width: 100%;
            page-break-inside: avoid;
        }

        .equipment-name {
            font-weight: bold;
            width: 140px;
            float: left;
            margin-right: 10px;
        }

        .equipment-details {
            margin-left: 150px;
            min-height: 20px;
        }

        .equipment-detail {
            display: block;
            margin-bottom: 0px;
            float: left;
            margin-right: 25px;
            clear: none;
        }

        .footer-text {
            margin-top: 30px;
            font-size: 11px;
            text-align: justify;
            line-height: 1.5;
            border: 2px solid #e1251b;
            padding: 10px;
            background-color: #fef7f7;
        }

        .signature-section {
            margin-top: 40px;
            width: 100%;
        }

        .signature-box {
            width: 30%;
            float: left;
            text-align: center;
            margin-right: 5%;
        }

        .signature-box:last-child {
            margin-right: 0;
        }

        .warning-text {
            font-size: 12px;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
            color: #e1251b;
            background-color: #fef7f7;
            padding: 8px;
            border: 1px solid #e1251b;
        }

        .inline-field {
            display: inline-block;
            margin-right: 15px;
        }

        .birth-date-row {
            width: 100%;
        }

        .birth-field {
            display: inline-block;
            margin-right: 20px;
        }

        .form-field-date {
            border-bottom: 1px solid #000;
            display: inline-block;
            min-width: 200px;
            margin-left: 10px;
            font-size: 13px;
            letter-spacing: 1px;
            padding: 0 7px;
        }

        .date-labels {
            margin-left: 140px;
            margin-top: 2px;
        }

        .date-label {
            display: inline-block;
            width: 60px;
            text-align: center;
            font-size: 10px;
            margin-right: 5px;
        }

        .birth-age-container {
            width: 100%;
        }

        .birth-container {
            float: left;
            width: 70%;
        }

        .age-container {
            float: left;
            width: 30%;
        }

        /* Estilos para los checkboxes de propio/prestado */
        .checkbox-container {
            display: inline-block;
            margin-left: 5px;
        }

        .checkbox {
            width: 12px;
            height: 12px;
            border: 1px solid #000;
            display: inline-block;
            margin-right: 3px;
            vertical-align: middle;
        }

        .checkbox-filled {
            background-color: #000;
        }

        .checkbox-label {
            font-size: 10px;
            vertical-align: middle;
        }

        .ownership-row {
            margin-bottom: 5px;
            width: 100%;
            display: block;
        }

        .equipment-row {
            width: 100%;
            margin-bottom: 5px;
        }

        .equipment-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }

        .equipment-table td {
            padding: 5px 3px;
            vertical-align: middle;
        }

        .equipo-field {
            font-size: 10px;
        }
    </style>
</head>
<body>
    <!-- Header con logo y información del club -->
    <div class="header">
        <div class="header-content">
            <div class="logo">
                <!-- Aquí iría el logo del club -->
                <img src="{{ public_path('logo/logo.png') }}" alt="Logo Club Potros" style="width: 100%; height: 100%;">
            </div>
            <div class="club-info">
                <div class="club-name">
                    CLUB POTROS DE LA ANAHUAC<br>
                    FRATERNIDAD LEGÍTIMOS POTROS, A.C.
                </div>
                <div class="club-address">
                    PORFIRIO BARBA JACOB NO. 901, COL. ANAHUAC, TEL. (81) 2003-9629
                    <br>
                    SAN NICOLAS DE LOS GARZA, NUEVO LEÓN, C.P. 66450
                </div>
            </div>
            <div class="clear"></div>
        </div>
    </div>

    <!-- Título principal -->
    <div class="title">CONTROL DE UTILERÍA - {{ $temporada ?? '' }}</div>

    <!-- Información básica -->
    <div class="form-row">
        <div class="form-group">
            <span class="form-label">CATEGORÍA:</span>
            <span class="form-field">{{ $categoria ?? '' }}</span>
        </div>
    </div>
    <div class="form-row">
        <div class="form-group">
           <span class="form-label">NO. JERSEY:</span>
            <span class="form-field form-field-short">{{ $numero_jersey ?? '' }}</span>
        </div>
    </div>

    <!-- Datos personales del jugador -->
    <div class="section-title">DATOS PERSONALES DEL JUGADOR</div>

    <div class="form-row">
        <div class="form-group">
            <span class="form-label">NOMBRE:</span>
            <span class="form-field" style="min-width: 400px;">{{ $nombre_jugador ?? '' }}</span>
        </div>
    </div>

    <div class="form-row">
        <div class="birth-age-container">
            <div class="birth-container">
                <span class="form-label">FECHA DE NACIMIENTO:</span>
                <span class="form-field-date">{{ \Carbon\Carbon::parse($fecha_nacimiento)->translatedFormat('d \d\e F \d\e Y') ?? '' }}</span>
            </div>
            <div class="age-container">
                <span class="form-label">EDAD:</span>
                <span class="form-field form-field-short">{{ $edad ?? '' }}</span>
            </div>
            <div class="clear"></div>
        </div>
    </div>

    <div class="form-row">
        <div class="form-group">
            <span class="form-label">DOMICILIO COMPLETO:</span>
            <span class="form-field" style="min-width: 400px;">{{ $domicilio ?? '' }}</span>
        </div>
    </div>

    <!-- Datos personales del responsable -->
    <div class="section-title">DATOS PERSONALES DEL RESPONSABLE</div>

    <div class="form-row">
        <div class="form-group">
            <span class="form-label">NOMBRE:</span>
            <span class="form-field" style="min-width: 400px;">{{ $nombre_responsable ?? '' }}</span>
        </div>
    </div>

    <div class="form-row">
        <div class="form-group">
            <span class="form-label">TELÉFONO:</span>
            <span class="form-field">{{ $telefono_responsable ?? '' }}</span>
        </div>
    </div>

    <!-- Aviso importante -->
    <div class="warning-text">
        EL EQUIPO DEBERÁ SER ENTREGADO AL FINALIZAR EL ÚLTIMO PARTIDO DE LA TEMPORADA
    </div>

    <!-- Lista de equipo entregado -->
    <div class="section-title">EQUIPO ENTREGADO (FAVOR DE VERIFICAR QUE SE LE ENTREGÓ)</div>

    <div class="equipment-list">
    <!-- CASCO -->
    <table class="equipment-table">
        <tr>
            <td style="width: 80px; font-weight: bold;">CASCO:</td>
            <td style="width: 180px;">
                MARCA: <span class="form-field equipo-field" style="min-width: 80px;">{{ $casco_marca ?? '' }}</span>
            </td>
            <td style="width: 180px;">
                NO. SERIE: <span class="form-field equipo-field" style="min-width: 80px;">{{ $casco_serie ?? '' }}</span>
            </td>
            <td>
                <span class="checkbox-container">
                    <span class="checkbox {{ $casco_equipo === 'Propio' ? 'checkbox-filled' : '' }}"></span>
                    <span class="checkbox-label">Propio</span>
                </span>
                <span class="checkbox-container">
                    <span class="checkbox {{ $casco_equipo === 'Prestado' ? 'checkbox-filled' : '' }}"></span>
                    <span class="checkbox-label">Prestado</span>
                </span>
            </td>
        </tr>
    </table>

    <!-- HOMBRERAS -->
    <table class="equipment-table">
        <tr>
            <td style="width: 80px; font-weight: bold;">HOMBRERAS:</td>
            <td style="width: 180px;">
                MARCA: <span class="form-field equipo-field" style="min-width: 80px;">{{ $hombreras_marca ?? '' }}</span>
            </td>
            <td style="width: 180px;">
                NO. SERIE: <span class="form-field equipo-field" style="min-width: 80px;">{{ $hombreras_serie ?? '' }}</span>
            </td>
            <td>
                <span class="checkbox-container">
                    <span class="checkbox {{ $hombreras_equipo === 'Propio' ? 'checkbox-filled' : '' }}"></span>
                    <span class="checkbox-label">Propio</span>
                </span>
                <span class="checkbox-container">
                    <span class="checkbox {{ $hombreras_equipo === 'Prestado' ? 'checkbox-filled' : '' }}"></span>
                    <span class="checkbox-label">Prestado</span>
                </span>
            </td>
        </tr>
    </table>

    <!-- FUNDAS -->
    <table class="equipment-table">
        <tr>
            <td style="width: 80px; font-weight: bold;">FUNDAS:</td>
            <td style="width: 180px;">
                TALLA: <span class="form-field" style="min-width: 80px;">{{ $fundas_talla ?? '' }}</span>
            </td>
            <td style="width: 180px;">
                <!-- Celda vacía para mantener la alineación -->
            </td>
            <td>
                <span class="checkbox-container">
                    <span class="checkbox {{ $fundas_equipo === 'Propio' ? 'checkbox-filled' : '' }}"></span>
                    <span class="checkbox-label">Propio</span>
                </span>
                <span class="checkbox-container">
                    <span class="checkbox {{ $fundas_equipo === 'Prestado' ? 'checkbox-filled' : '' }}"></span>
                    <span class="checkbox-label">Prestado</span>
                </span>
            </td>
        </tr>
    </table>

    <!-- JERSEY DE ENTRENAMIENTO -->
    <table class="equipment-table">
        <tr>
            <td style="width: 80px; font-weight: bold;">JERSEY:</td>
            <td style="width: 180px;">
                TALLA: <span class="form-field" style="min-width: 80px;">{{ $jersey_talla ?? '' }}</span>
            </td>
            <td style="width: 180px;">
                TIPO: <span class="form-field" style="min-width: 80px;">{{ $jersey_tipo ?? '' }}</span>
                <span style="font-size: 10px;">(Ofensivo/Defensivo)</span>
            </td>
            <td>
                <span class="checkbox-container">
                    <span class="checkbox {{ $jersey_equipo === 'Propio' ? 'checkbox-filled' : '' }}"></span>
                    <span class="checkbox-label">Propio</span>
                </span>
                <span class="checkbox-container">
                    <span class="checkbox {{ $jersey_equipo === 'Prestado' ? 'checkbox-filled' : '' }}"></span>
                    <span class="checkbox-label">Prestado</span>
                </span>
            </td>
        </tr>
    </table>
</div>

    <!-- Texto de compromiso -->
    <div class="footer-text">
        EL DÍA <u>{{ $fecha_equipamiento ?? '' }}</u>, RECIBÍ EN CONFORMIDAD EL EQUIPO ANTERIORMENTE DESCRITO, EL CUAL ME COMPROMETO A REGRESAR ÍNTEGRO AL FINAL DE LA TEMPORADA, O EN SU DEFECTO A PAGAR A LA ORDEN DEL CLUB DEPORTIVO INFANTIL POTROS DE LA COLONIA ANAHUAC A.C. LA CANTIDAD DE <strong><u>${{ number_format($reposicion, 2) ?? '' }}</u></strong> PESOS.
    </div>

    <!-- Sección de firmas -->
    <div class="signature-section">
        <div class="signature-box">
            <div class="signature-line"></div>
            <div>FIRMA DEL JUGADOR</div>
        </div>
        <div class="signature-box">
            <div class="signature-line"></div>
            <div>FIRMA DEL RESPONSABLE</div>
        </div>
        <div class="signature-box">
            <div class="signature-line"></div>
            <div>FIRMA DEL CLUB</div>
        </div>
        <div class="clear"></div>
    </div>
</body>
</html>
