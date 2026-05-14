import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
import {
  Home, Package, MapPin, Wrench, List, Search, Plus,
  ChevronRight, ChevronLeft, Camera, AlertTriangle, User,
  Clock, ArrowUp, ArrowDown, Trash2, Star, X,
  Info, Box, QrCode, Archive, Layers, RefreshCw,
  TrendingUp, Edit2, ClipboardList, CheckCircle, Filter,
  ArrowUpDown, History, Printer, SortAsc, ChevronDown,
  Moon, Sun, Download, Tag, Building2, BarChart2,
  CheckSquare, Square, Settings, ImagePlus, Barcode,
  Bell, Send, Inbox, ThumbsUp, ThumbsDown, PackageCheck, LogOut, HardHat, ShieldCheck
} from "lucide-react";

const ThemeCtx = createContext(null);
const useC = () => useContext(ThemeCtx);

function mkColors(dark) {
  return {
    bg:    dark?"#0D1117":"#ECEEF5",
    s1:    dark?"#161B22":"#FFFFFF",
    s2:    dark?"#21262D":"#F4F5FA",
    s3:    dark?"#1C2128":"#ECEEF5",
    border:dark?"#30363D":"#DDE1EE",
    borderSoft:dark?"rgba(255,255,255,0.07)":"rgba(28,20,117,0.09)",
    navy:  "#1C1475",
    navyD: "#150F58",
    navyL: dark?"rgba(100,130,255,0.18)":"rgba(28,20,117,0.07)",
    navyM: dark?"rgba(100,130,255,0.28)":"rgba(28,20,117,0.13)",
    navyBorder:dark?"rgba(100,130,255,0.35)":"rgba(28,20,117,0.2)",
    green: "#4FA800",
    greenD:"#3D8200",
    greenL:dark?"rgba(79,168,0,0.15)":"rgba(79,168,0,0.08)",
    greenBorder:dark?"rgba(79,168,0,0.3)":"rgba(79,168,0,0.2)",
    red:   "#C0392B",
    redL:  dark?"rgba(192,57,43,0.18)":"rgba(192,57,43,0.07)",
    redBorder:dark?"rgba(192,57,43,0.35)":"rgba(192,57,43,0.18)",
    amber: "#B45309",
    amberL:dark?"rgba(180,83,9,0.18)":"rgba(180,83,9,0.07)",
    t1:    dark?"#F0F6FC":"#0D1117",
    t2:    dark?"#8B949E":"#374151",
    t3:    dark?"#6E7681":"#6B7280",
    t4:    dark?"#484F58":"#9CA3AF",
    t5:    dark?"#30363D":"#D1D5DB",
    shadow:dark?"0 1px 2px rgba(0,0,0,0.4),0 3px 12px rgba(0,0,0,0.3)"
               :"0 1px 2px rgba(13,17,23,0.05),0 3px 12px rgba(28,20,117,0.06)",
    shadowMd:dark?"0 2px 4px rgba(0,0,0,0.5),0 8px 24px rgba(0,0,0,0.4)"
                 :"0 2px 4px rgba(13,17,23,0.07),0 8px 24px rgba(28,20,117,0.09)",
    shadowLg:dark?"0 4px 8px rgba(0,0,0,0.6),0 16px 40px rgba(0,0,0,0.5)"
                 :"0 4px 8px rgba(13,17,23,0.09),0 16px 40px rgba(28,20,117,0.13)",
  };
}
let C = mkColors(false);

function LogoAldago({height=38}) {
  return (
    <svg viewBox="0 0 168 79" height={height} style={{display:"block"}}>
      <path fill="#FFFFFF" fillRule="nonzero" d="M 19.04 33.22 Q 23.98 33.22 26.73 35.75 Q 29.49 38.27 29.49 43.27 L 29.49 61.77 L 23.73 61.77 L 22.25 58.05 L 22.05 58.05 Q 20.41 60.24 18.57 61.26 Q 16.74 62.28 13.64 62.28 Q 9.97 62.28 7.87 59.88 Q 5.78 57.48 5.78 53.36 Q 5.78 48.87 8.64 46.71 Q 11.49 44.54 17.05 44.29 L 21.33 44.13 L 21.33 43.27 Q 21.33 39.34 17.81 39.34 Q 16.19 39.34 14.40 39.87 Q 12.62 40.41 10.67 41.38 L 8.28 35.72 Q 10.47 34.54 13.20 33.88 Q 15.93 33.22 19.04 33.22 Z M 19.08 49.13 Q 16.34 49.23 15.19 50.25 Q 14.04 51.27 14.04 53.05 Q 14.04 54.73 14.83 55.47 Q 15.62 56.21 16.95 56.21 Q 18.78 56.21 20.08 54.91 Q 21.38 53.61 21.38 51.37 L 21.38 49.02 L 19.08 49.13 Z M 44.17 61.77 L 36.01 61.77 L 36.01 23.03 L 44.17 23.03 L 44.17 61.77 Z M 59.15 62.28 Q 54.82 62.28 52.19 58.53 Q 49.57 54.78 49.57 47.75 Q 49.57 40.72 52.22 37.00 Q 54.87 33.27 59.21 33.27 Q 61.75 33.27 63.48 34.37 Q 65.22 35.47 66.34 37.35 L 66.60 37.35 Q 66.44 36.13 66.31 34.60 Q 66.18 33.07 66.18 31.69 L 66.18 23.03 L 74.34 23.03 L 74.34 61.77 L 68.02 61.77 L 66.54 58.41 L 66.18 58.41 Q 65.01 60.19 63.38 61.23 Q 61.75 62.28 59.15 62.28 Z M 62.06 55.70 Q 64.45 55.70 65.50 53.97 Q 66.54 52.23 66.60 48.62 L 66.60 47.49 Q 66.60 43.78 65.58 41.89 Q 64.56 40.00 62.01 40.00 Q 60.02 40.00 58.92 41.97 Q 57.83 43.93 57.83 47.80 Q 57.83 51.83 58.94 53.76 Q 60.07 55.70 62.06 55.70 Z M 92.69 33.22 Q 97.64 33.22 100.38 35.75 Q 103.14 38.27 103.14 43.27 L 103.14 61.77 L 97.38 61.77 L 95.90 58.05 L 95.70 58.05 Q 94.07 60.24 92.23 61.26 Q 90.40 62.28 87.29 62.28 Q 83.62 62.28 81.52 59.88 Q 79.44 57.48 79.44 53.36 Q 79.44 48.87 82.29 46.71 Q 85.15 44.54 90.70 44.29 L 94.98 44.13 L 94.98 43.27 Q 94.98 39.34 91.46 39.34 Q 89.84 39.34 88.06 39.87 Q 86.27 40.41 84.33 41.38 L 81.94 35.72 Q 84.13 34.54 86.85 33.88 Q 89.58 33.22 92.69 33.22 Z M 92.74 49.13 Q 89.99 49.23 88.84 50.25 Q 87.70 51.27 87.70 53.05 Q 87.70 54.73 88.49 55.47 Q 89.27 56.21 90.60 56.21 Q 92.44 56.21 93.73 54.91 Q 95.03 53.61 95.03 51.37 L 95.03 49.02 L 92.74 49.13 Z M 118.07 33.27 Q 120.58 33.27 122.28 34.27 Q 123.98 35.26 125.26 37.30 L 125.51 37.30 L 126.18 33.78 L 133.16 33.78 L 133.16 61.11 Q 133.16 67.37 129.80 70.69 Q 126.44 74.00 119.45 74.00 Q 116.59 74.00 114.28 73.59 Q 111.96 73.19 109.77 72.22 L 109.77 65.44 Q 112.21 66.51 114.48 67.04 Q 116.75 67.58 119.35 67.58 Q 122.10 67.58 123.55 66.31 Q 125.00 65.03 125.00 62.28 L 125.00 61.81 Q 125.00 60.09 125.26 58.15 L 125.00 58.15 Q 123.83 60.19 122.10 61.23 Q 120.37 62.28 117.92 62.28 Q 113.49 62.28 110.94 58.51 Q 108.39 54.73 108.39 47.85 Q 108.39 40.92 111.01 37.09 Q 113.64 33.27 118.07 33.27 Z M 120.83 39.90 Q 116.70 39.90 116.70 48.00 Q 116.70 51.93 117.74 53.82 Q 118.79 55.70 120.93 55.70 Q 123.28 55.70 124.34 54.07 Q 125.42 52.44 125.42 48.82 L 125.42 47.65 Q 125.42 43.62 124.37 41.76 Q 123.32 39.90 120.83 39.90 Z M 164.00 47.70 Q 164.00 52.03 162.57 55.32 Q 161.15 58.60 158.29 60.44 Q 155.44 62.28 151.21 62.28 Q 147.28 62.28 144.45 60.44 Q 141.62 58.60 140.07 55.35 Q 138.51 52.08 138.51 47.70 Q 138.51 41.02 141.80 37.15 Q 145.09 33.27 151.36 33.27 Q 155.08 33.27 157.93 34.93 Q 160.79 36.58 162.39 39.83 Q 164.00 43.06 164.00 47.70 Z M 146.82 47.75 Q 146.82 51.72 147.86 53.76 Q 148.92 55.80 151.30 55.80 Q 153.70 55.80 154.72 53.76 Q 155.74 51.72 155.74 47.70 Q 155.74 43.72 154.70 41.74 Q 153.65 39.75 151.26 39.75 Q 148.92 39.75 147.86 41.74 Q 146.82 43.72 146.82 47.75 Z"/>
      <path fill="#4FA800" fillRule="evenodd" shapeRendering="geometricPrecision" d="M 116.12 36.25 L 119.38 38.88 L 128.5 37.88 L 132.38 30.88 L 137.88 31.5 L 139.88 26.38 L 136.5 14 L 121 16.38 L 121 21.5 L 125.88 24.62 L 123 30.5 Z M 88 26.38 C 87.86 29.51, 88.8 34.73, 90 36.5 C 91.2 38.27, 95.08 37.61, 96.5 38.88 C 97.92 40.16, 98.87 44.37, 100 45.5 C 101.13 46.63, 102.98 48.05, 104.5 46.88 C 106.02 45.71, 111.07 39.09, 110.75 37.25 C 110.43 35.41, 104.06 35.24, 102.25 33.88 C 100.44 32.52, 98.48 30.1, 98 27.62 C 97.52 25.14, 97.57 19.02, 98.88 16.38 C 100.19 13.74, 104.19 10.35, 107.25 9 C 110.31 7.65, 118.76 7.45, 120.5 6.88 C 122.24 6.31, 121.5 5.41, 119.5 5 C 117.5 4.59, 109.94 3.29, 106.38 4 C 102.82 4.71, 96.56 8.53, 94.38 10 C 92.2 11.47, 91.9 12.06, 91 14.38 C 90.1 16.7, 88.14 23.25, 88 26.38 Z"/>
    </svg>
  );
}
function LogoSymbol({size=28}) {
  return (
    <svg viewBox="86 2 56 50" width={size} height={size} style={{display:"block"}}>
      <path fill="#4FA800" fillRule="evenodd" shapeRendering="geometricPrecision" d="M 116.12 36.25 L 119.38 38.88 L 128.5 37.88 L 132.38 30.88 L 137.88 31.5 L 139.88 26.38 L 136.5 14 L 121 16.38 L 121 21.5 L 125.88 24.62 L 123 30.5 Z M 88 26.38 C 87.86 29.51, 88.8 34.73, 90 36.5 C 91.2 38.27, 95.08 37.61, 96.5 38.88 C 97.92 40.16, 98.87 44.37, 100 45.5 C 101.13 46.63, 102.98 48.05, 104.5 46.88 C 106.02 45.71, 111.07 39.09, 110.75 37.25 C 110.43 35.41, 104.06 35.24, 102.25 33.88 C 100.44 32.52, 98.48 30.1, 98 27.62 C 97.52 25.14, 97.57 19.02, 98.88 16.38 C 100.19 13.74, 104.19 10.35, 107.25 9 C 110.31 7.65, 118.76 7.45, 120.5 6.88 C 122.24 6.31, 121.5 5.41, 119.5 5 C 117.5 4.59, 109.94 3.29, 106.38 4 C 102.82 4.71, 96.56 8.53, 94.38 10 C 92.2 11.47, 91.9 12.06, 91 14.38 C 90.1 16.7, 88.14 23.25, 88 26.38 Z"/>
    </svg>
  );
}

const STATUS = {
  disponible: {label:"Disponible",    c:"#4FA800", bg:"rgba(79,168,0,0.08)"},
  en_uso:     {label:"En uso",        c:"#1C1475", bg:"rgba(28,20,117,0.07)"},
  prestado:   {label:"Prestado",      c:"#1C1475", bg:"rgba(28,20,117,0.07)"},
  roto:       {label:"Roto",          c:"#C0392B", bg:"rgba(192,57,43,0.07)"},
  reparacion: {label:"En reparación", c:"#C0392B", bg:"rgba(192,57,43,0.07)"},
  perdido:    {label:"Perdido",       c:"#C0392B", bg:"rgba(192,57,43,0.07)"},
  tirar:      {label:"Para tirar",    c:"#C0392B", bg:"rgba(192,57,43,0.07)"},
  reubicar:   {label:"Reubicar",      c:"#6B7280", bg:"#F4F5FA"},
  venta:      {label:"Posible venta", c:"#1C1475", bg:"rgba(28,20,117,0.07)"},
  revisar:    {label:"Revisar",       c:"#6B7280", bg:"#F4F5FA"},
};

const LOCS = {
  1:{
    A:{1:[1,2,3,4,5],2:[1,2,3,4,5],3:[1,2,3,4,5,6],4:[1,2,3,4,5,6],5:[1,2,3,4,5,6],6:[1,2,3,4,5,6],7:[1,2,3,4,5],8:[1,2,3,4,5],9:[1,2,3,4,5,6],10:[1,2,3,4,5,6],11:[1,2,3,4,5,6],12:[1,2,3,4,5,6]},
    B:{1:[1,2,3],2:[1,2,3,4],3:[1,2,3,4]},
    C:{1:[1,2,3,4,5,6],2:[1,2,3,4,5,6],3:[1,2,3],4:[1,2,3,4],5:[1,2,3,4],6:[1,2,3,4]},
    D:{1:[1,2,3,4,5,6],2:[1,2,3,4,5,6],3:[1,2,3,4,5,6],4:[1,2,3,4,5]},
  },
  2:{
    A:{1:[1,2],2:["Cajones"],3:[1,2,3,4,5],4:[1,2]},
    B:{1:["Armario"],2:["Armario"],3:["Cajones"],4:["Armario"],5:[1,2,3,4,5,6],6:[1,2,3,4,5],7:[1,2,3,4,5]},
    C:{1:[1,2,3,4,5,6,7,8],2:[1,2,3,4,5,6],3:[1,2],4:[1,2]},
    D:{1:[1,2],2:[1,2],3:[1,2],4:[1,2]},
    E:{1:[1,2,3,4,5],2:[1,2,3,4,5],3:[1,2,3,4,5]},
  }
};

const locType=(a,z,m)=>{const l=LOCS[a]?.[z]?.[m];if(!l)return "Estantería";if(l[0]==="Armario")return "Armario";if(l[0]==="Cajones")return "Cajones";return "Estantería";};
const fmtDate=()=>new Date().toLocaleString("es-ES",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"});
const fmtDateShort=()=>new Date().toLocaleDateString("es-ES",{day:"2-digit",month:"2-digit",year:"2-digit"});

async function exportarExcel(items,movs) {
  if(!window.XLSX){await new Promise((res,rej)=>{const s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";s.onload=res;s.onerror=rej;document.head.appendChild(s);});}
  const toRow=it=>({"Nombre":it.nombre,"Tipo":it.tipo==="herramienta"?"Herramienta":"Consumible","Categoría":it.cat||"","Estado":STATUS[it.estado]?.label||it.estado,"Ubicación":it.ubicacion||"","Quién lo tiene":it.quien||"","Proveedor":it.proveedor||"","Stock actual":it.stock??"-","Stock mínimo":it.stockMin??"-","Precio unitario (€)":it.precio??"-","Notas":it.notas||""});
  const movRow=mv=>({"Fecha":mv.fecha,"Artículo":items.find(i=>i.id===mv.itemId)?.nombre||mv.itemId,"Tipo":mv.tipo,"Quién":mv.quien||"","Nota":mv.nota||""});
  const wb=window.XLSX.utils.book_new();
  window.XLSX.utils.book_append_sheet(wb,window.XLSX.utils.json_to_sheet(items.filter(i=>i.tipo==="herramienta").map(toRow)),"Herramientas");
  window.XLSX.utils.book_append_sheet(wb,window.XLSX.utils.json_to_sheet(items.filter(i=>i.tipo==="consumible").map(toRow)),"Consumibles");
  window.XLSX.utils.book_append_sheet(wb,window.XLSX.utils.json_to_sheet([...movs].reverse().map(movRow)),"Historial");
  window.XLSX.writeFile(wb,`Aldago_Inventario_${fmtDateShort().replace(/\//g,"-")}.xlsx`);
}

const ITEMS0=[
  {id:"h01",nombre:"Taladro Percutor Bosch GSB 18V-55",tipo:"herramienta",cat:"Taladros",estado:"en_uso",ubicacion:"A1-A1-N2",quien:"Carlos M.",desde:"08/01/25, 08:30",notas:"Batería nueva diciembre 2024",precio:null,stock:null,stockMin:null,fotos:[],proveedor:"",proximaRevision:null},
  {id:"h02",nombre:"Amoladora Angular Makita GA4530R",tipo:"herramienta",cat:"Amolado",estado:"disponible",ubicacion:"A1-A2-N1",quien:null,desde:null,notas:"",precio:null,stock:null,stockMin:null,fotos:[],proveedor:"",proximaRevision:null},
  {id:"h03",nombre:"Sierra Circular DeWalt DWE560",tipo:"herramienta",cat:"Sierras",estado:"reparacion",ubicacion:"A1-A1-N3",quien:null,desde:"03/01/25, 09:00",notas:"Plato de corte doblado.",precio:null,stock:null,stockMin:null,fotos:[],proveedor:"",proximaRevision:null},
  {id:"h04",nombre:"Nivel Láser Bosch GLL 3-80 G",tipo:"herramienta",cat:"Medición",estado:"prestado",ubicacion:null,quien:"Marc T.",desde:"05/01/25, 14:15",notas:"",precio:null,stock:null,stockMin:null,fotos:[],proveedor:"",proximaRevision:null},
  {id:"h05",nombre:"Destornillador Eléctrico Makita DF333D",tipo:"herramienta",cat:"Atornillado",estado:"disponible",ubicacion:"A1-A3-N1",quien:null,desde:null,notas:"",precio:null,stock:null,stockMin:null,fotos:[],proveedor:"",proximaRevision:null},
  {id:"h06",nombre:"Compresor de Aire 24L Scheppach",tipo:"herramienta",cat:"Neumática",estado:"disponible",ubicacion:"A2-A1-N1",quien:null,desde:null,notas:"Revisión anual: marzo 2025",precio:null,stock:null,stockMin:null,fotos:[],proveedor:"",proximaRevision:"2025-03-15"},
  {id:"h07",nombre:"Aspiradora Industrial Kärcher WD5",tipo:"herramienta",cat:"Limpieza",estado:"roto",ubicacion:"A2-B5-N1",quien:null,desde:"02/01/25, 11:00",notas:"Motor fundido.",precio:null,stock:null,stockMin:null,fotos:[],proveedor:"",proximaRevision:null},
  {id:"h08",nombre:"Generador Honda EU22i 2kW",tipo:"herramienta",cat:"Generación",estado:"venta",ubicacion:"A2-A4-N1",quien:null,desde:null,notas:"Funciona perfecto. P.V.P. orientativo: 300€.",precio:null,stock:null,stockMin:null,fotos:[],proveedor:"",proximaRevision:null},
  {id:"h09",nombre:"Escalera Aluminio 3 Tramos 3x9",tipo:"herramienta",cat:"Acceso",estado:"revisar",ubicacion:"A1-D4-N2",quien:null,desde:null,notas:"Peldaño doblado. Revisar seguridad.",precio:null,stock:null,stockMin:null,fotos:[],proveedor:"",proximaRevision:"2025-02-01"},
  {id:"h10",nombre:"Pistola Termofusible Steinel HG2320",tipo:"herramienta",cat:"Varios",estado:"disponible",ubicacion:"A1-B1-N2",quien:null,desde:null,notas:"",precio:null,stock:null,stockMin:null,fotos:[],proveedor:"",proximaRevision:null},
  {id:"c01",nombre:"Tacos Nylon M6 (bolsa 100u)",tipo:"consumible",cat:"Fijación",estado:"disponible",ubicacion:"A1-A5-N3",quien:null,desde:null,notas:"",precio:0.08,stock:3,stockMin:2,fotos:[],proveedor:"Bricomart"},
  {id:"c02",nombre:"Tornillos 4.5x40 Hexagonal (caja 200u)",tipo:"consumible",cat:"Fijación",estado:"disponible",ubicacion:"A1-A5-N3",quien:null,desde:null,notas:"",precio:0.05,stock:4,stockMin:3,fotos:[],proveedor:"Bricomart"},
  {id:"c03",nombre:"Silicona Neutra Blanca 300ml",tipo:"consumible",cat:"Sellado",estado:"disponible",ubicacion:"A1-A6-N2",quien:null,desde:null,notas:"",precio:4.20,stock:1,stockMin:3,fotos:[],proveedor:"Leroy Merlin"},
  {id:"c04",nombre:"Espuma Poliuretano 750ml",tipo:"consumible",cat:"Sellado",estado:"disponible",ubicacion:"A1-A6-N3",quien:null,desde:null,notas:"",precio:6.80,stock:0,stockMin:2,fotos:[],proveedor:"Leroy Merlin"},
  {id:"c05",nombre:"Bridas Nylon 300mm (bolsa 100u)",tipo:"consumible",cat:"Sujeción",estado:"disponible",ubicacion:"A1-A4-N4",quien:null,desde:null,notas:"",precio:0.12,stock:5,stockMin:2,fotos:[],proveedor:""},
  {id:"c06",nombre:"Cable Manguera 3x1.5mm (metro)",tipo:"consumible",cat:"Electricidad",estado:"disponible",ubicacion:"A2-C1-N3",quien:null,desde:null,notas:"Tambor 100m. Quedan aprox. 20m.",precio:1.80,stock:20,stockMin:10,fotos:[],proveedor:"Rexel"},
  {id:"c07",nombre:"Bombilla LED E27 10W (caja 10u)",tipo:"consumible",cat:"Iluminación",estado:"disponible",ubicacion:"A2-B6-N2",quien:null,desde:null,notas:"",precio:3.50,stock:8,stockMin:5,fotos:[],proveedor:""},
  {id:"c08",nombre:"Pintura Plástica Blanca Titanlux 15L",tipo:"consumible",cat:"Pintura",estado:"disponible",ubicacion:"A2-D1-N1",quien:null,desde:null,notas:"",precio:45.00,stock:2,stockMin:1,fotos:[],proveedor:"Pinturas Valdés"},
  {id:"c09",nombre:"Filtro Aire Split 30x25cm",tipo:"consumible",cat:"Climatización",estado:"disponible",ubicacion:"A2-C2-N4",quien:null,desde:null,notas:"Compatible Mitsubishi, Daikin y Fujitsu.",precio:8.50,stock:6,stockMin:4,fotos:[],proveedor:"Climaver"},
  {id:"c10",nombre:"Cinta Americana 50mm x 25m",tipo:"consumible",cat:"Fijación",estado:"disponible",ubicacion:"A1-C3-N2",quien:null,desde:null,notas:"",precio:5.90,stock:3,stockMin:2,fotos:[],proveedor:""},
];

const MOVS0=[
  {id:"m1",itemId:"h01",tipo:"salida",fecha:"Hoy · 08:30",quien:"Carlos M.",nota:"Obra Aragón 145"},
  {id:"m2",itemId:"h04",tipo:"salida",fecha:"Hace 3 días",quien:"Marc T.",nota:"Revisión Sant Gervasi"},
  {id:"m3",itemId:"c03",tipo:"uso",fecha:"Ayer · 14:00",quien:"Carlos M.",nota:"2 ud · Obra Aragón 145",cantidad:2},
  {id:"m4",itemId:"c04",tipo:"agotado",fecha:"Ayer · 11:30",quien:"Marc T.",nota:"Última unidad usada",cantidad:1},
  {id:"m5",itemId:"h02",tipo:"entrada",fecha:"Hace 5 días",quien:"Carlos M.",nota:"Vuelta de Sant Gervasi"},
];

const DISTRITOS=[
  {nombre:"Gràcia",email:"lcasadevall@grupaldago.es",admin:"Laura Casadevall"},
  {nombre:"Sant Martí",email:"lcasadevall@grupaldago.es",admin:"Laura Casadevall"},
  {nombre:"Horta",email:"kmateo@grupaldago.es",admin:"K. Mateo"},
  {nombre:"Urbanisme",email:"kmateo@grupaldago.es",admin:"K. Mateo"},
  {nombre:"Parcs i Jardins",email:"acuria@grupaldago.es",admin:"A. Curia"},
  {nombre:"Ciutat Vella",email:"acuria@grupaldago.es",admin:"A. Curia"},
  {nombre:"Sants",email:"sgracia@grupaldago.es",admin:"S. Gràcia"},
];

const SOLS0 = [];


// ─── HELPERS ─────────────────────────────────────────────
function Chip({estado,small}) {
  const s=STATUS[estado]||{label:estado,c:C.t3,bg:C.s2};
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:small?"2px 7px":"3px 10px",borderRadius:5,background:s.bg,fontSize:small?10:11,fontWeight:600,color:s.c,whiteSpace:"nowrap",border:`1px solid ${s.c}25`,fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.1px"}}>
      <span style={{width:5,height:5,borderRadius:"50%",background:s.c,flexShrink:0}}/>{s.label}
    </span>
  );
}
function Lbl({children}) {
  return <div style={{color:C.t4,fontSize:10,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",marginBottom:10,fontFamily:"'DM Sans',sans-serif"}}>{children}</div>;
}
function Empty({text}) {
  return <div style={{textAlign:"center",color:C.t4,padding:"56px 20px",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>{text}</div>;
}
function ItemRow({item,onClick,selected,onSelect}) {
  const isH=item.tipo==="herramienta";
  const isOut=item.tipo==="consumible"&&item.stock===0;
  const isLow=item.tipo==="consumible"&&item.stock!==null&&item.stock>0&&item.stock<=item.stockMin;
  const alert=isOut||isLow;
  const foto=item.fotos?.[0]||item.foto||null;
  return (
    <div onClick={()=>onSelect?onSelect(item.id):onClick(item)} style={{background:selected?C.navyL:C.s1,borderRadius:10,padding:"13px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:12,border:`1px solid ${selected?C.navyBorder:alert?C.redBorder:C.border}`,boxShadow:C.shadow,borderLeft:`3px solid ${selected?C.navy:alert?C.red:isH?C.navy:C.green}`}}>
      {onSelect&&<div onClick={e=>{e.stopPropagation();onSelect(item.id);}} style={{flexShrink:0}}>{selected?<CheckSquare size={18} color={C.navy}/>:<Square size={18} color={C.t4}/>}</div>}
      {foto?<img src={foto} alt="" style={{width:38,height:38,borderRadius:8,objectFit:"cover",flexShrink:0}}/>:<div style={{width:38,height:38,borderRadius:8,flexShrink:0,background:isH?C.navyL:C.greenL,display:"flex",alignItems:"center",justifyContent:"center"}}>{isH?<Wrench size={16} color={C.navy}/>:<Package size={16} color={C.green}/>}</div>}
      <div style={{flex:1,minWidth:0}}>
        <div style={{color:C.t1,fontSize:13,fontWeight:600,marginBottom:4,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",fontFamily:"'DM Sans',sans-serif",letterSpacing:"-0.1px"}}>{item.nombre}</div>
        <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
          <Chip estado={item.estado} small/>
          {item.ubicacion&&<span style={{color:C.t4,fontSize:10,display:"flex",alignItems:"center",gap:2,fontFamily:"'DM Mono',monospace"}}><MapPin size={9} color={C.t4}/>{item.ubicacion}</span>}
          {item.quien&&item.estado!=="disponible"&&<span style={{color:C.t3,fontSize:11,display:"flex",alignItems:"center",gap:2}}><User size={9} color={C.t3}/>{item.quien}</span>}
          {item.tipo==="consumible"&&item.stock!==null&&<span style={{color:isOut||isLow?C.red:C.t4,fontSize:10,fontWeight:isOut||isLow?700:400}}>{isOut?"⚠ Agotado":isLow?`⚠ Stock: ${item.stock}`:`${item.stock} ud.`}</span>}
          {item.proveedor&&<span style={{color:C.t4,fontSize:10,display:"flex",alignItems:"center",gap:2}}><Building2 size={9} color={C.t4}/>{item.proveedor}</span>}
        </div>
      </div>
      {!onSelect&&item.tipo==="consumible"&&item.precio&&<div style={{textAlign:"right",flexShrink:0,background:C.navyL,padding:"4px 8px",borderRadius:6}}><div style={{color:C.navy,fontSize:12,fontWeight:700,fontFamily:"'DM Mono',monospace"}}>{item.precio.toFixed(2)}€</div><div style={{color:C.t4,fontSize:9,textAlign:"center"}}>ud.</div></div>}
      {!onSelect&&<ChevronRight size={14} color={C.t5}/>}
    </div>
  );
}
function FG({label,children}) {
  return <div style={{marginBottom:16}}><div style={{color:C.t2,fontSize:12,fontWeight:600,marginBottom:6}}>{label}</div>{children}</div>;
}
const IS={background:"#F4F5FA",border:"1px solid #DDE1EE",borderRadius:8,padding:"10px 12px",color:"#0D1117",fontSize:13,fontFamily:"inherit",outline:"none",width:"100%",boxSizing:"border-box"};

function SalidaModal({item,onClose,onConfirm}) {
  const [quien,setQuien]=useState(""); const [nota,setNota]=useState(""); const [estado,setEstado]=useState("en_uso");
  const ok=quien.trim().length>0;
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div style={{background:C.s1,borderRadius:"20px 20px 0 0",width:"100%",maxWidth:430,boxShadow:"0 -8px 40px rgba(0,0,0,0.15)"}}>
        <div style={{padding:"16px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div><div style={{color:C.t1,fontSize:16,fontWeight:700}}>Registrar salida</div><div style={{color:C.t3,fontSize:12,marginTop:2,maxWidth:260,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.nombre}</div></div>
          <button onClick={onClose} style={{background:C.s2,border:`1px solid ${C.border}`,borderRadius:8,cursor:"pointer",padding:6,display:"flex"}}><X size={16} color={C.t2}/></button>
        </div>
        <div style={{padding:18}}>
          <div style={{display:"flex",gap:8,marginBottom:16}}>
            {[["en_uso","En uso"],["prestado","Prestado"]].map(([v,l])=>(
              <button key={v} onClick={()=>setEstado(v)} style={{flex:1,padding:10,borderRadius:8,border:`1px solid ${estado===v?C.navy:C.border}`,background:estado===v?C.navyL:C.s2,color:estado===v?C.navy:C.t2,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{l}</button>
            ))}
          </div>
          <FG label="¿Quién se lo lleva? *"><input value={quien} onChange={e=>setQuien(e.target.value)} placeholder="Nombre del trabajador" style={IS}/></FG>
          <FG label="Destino / Obra"><input value={nota} onChange={e=>setNota(e.target.value)} placeholder="Ej: Obra Aragón 145" style={IS}/></FG>
        </div>
        <div style={{padding:"0 18px 18px"}}>
          <button onClick={()=>ok&&onConfirm({quien,nota,estado})} style={{width:"100%",padding:13,borderRadius:10,border:"none",fontFamily:"inherit",background:ok?C.navy:C.s2,color:ok?"#fff":C.t3,fontSize:14,fontWeight:700,cursor:ok?"pointer":"default"}}>Confirmar salida</button>
        </div>
      </div>
    </div>
  );
}

function DevolucionModal({item,onClose,onConfirm}) {
  const [estadoRet,setEstadoRet]=useState("disponible"); const [nota,setNota]=useState("");
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div style={{background:C.s1,borderRadius:"20px 20px 0 0",width:"100%",maxWidth:430,boxShadow:"0 -8px 40px rgba(0,0,0,0.15)"}}>
        <div style={{padding:"16px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div><div style={{color:C.t1,fontSize:16,fontWeight:700}}>Registrar devolución</div><div style={{color:C.t3,fontSize:12,marginTop:2,maxWidth:260,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.nombre}</div></div>
          <button onClick={onClose} style={{background:C.s2,border:`1px solid ${C.border}`,borderRadius:8,cursor:"pointer",padding:6,display:"flex"}}><X size={16} color={C.t2}/></button>
        </div>
        <div style={{padding:18}}>
          <FG label="Estado en que vuelve">
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {[["disponible","Bien"],["revisar","Revisar"],["roto","Rota/Dañada"]].map(([v,l])=>(
                <button key={v} onClick={()=>setEstadoRet(v)} style={{padding:"7px 14px",borderRadius:8,fontFamily:"inherit",border:`1px solid ${estadoRet===v?(STATUS[v]?.c||C.navy):C.border}`,background:estadoRet===v?(STATUS[v]?.bg||C.navyL):C.s2,color:estadoRet===v?(STATUS[v]?.c||C.navy):C.t2,fontSize:12,fontWeight:600,cursor:"pointer"}}>{l}</button>
              ))}
            </div>
          </FG>
          <FG label="Notas de devolución"><textarea value={nota} onChange={e=>setNota(e.target.value)} placeholder="Estado al volver, incidencias..." rows={2} style={{...IS,resize:"vertical"}}/></FG>
        </div>
        <div style={{padding:"0 18px 18px"}}>
          <button onClick={()=>onConfirm({estadoRet,nota})} style={{width:"100%",padding:13,borderRadius:10,border:"none",fontFamily:"inherit",background:C.green,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}}>Confirmar devolución</button>
        </div>
      </div>
    </div>
  );
}

function EditModal({item,onClose,onSave}) {
  const [f,setF]=useState({...item,precio:item.precio??""});
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  const ok=f.nombre.trim().length>0;
  return (
    <div style={{position:"absolute",inset:0,background:C.bg,zIndex:300,display:"flex",flexDirection:"column"}}>
      <div style={{background:C.s1,padding:"14px 16px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${C.border}`}}>
        <div style={{color:C.t1,fontSize:16,fontWeight:700}}>Editar artículo</div>
        <button onClick={onClose} style={{background:C.s2,border:`1px solid ${C.border}`,borderRadius:8,cursor:"pointer",padding:6,display:"flex"}}><X size={16} color={C.t2}/></button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:16}}>
        <FG label="Nombre *"><input value={f.nombre} onChange={e=>set("nombre",e.target.value)} style={IS}/></FG>
        <FG label="Categoría"><input value={f.cat||""} onChange={e=>set("cat",e.target.value)} style={IS}/></FG>
        <FG label="Ubicación">
          <select value={f.ubicacion||""} onChange={e=>set("ubicacion",e.target.value)} style={{...IS,cursor:"pointer"}}>
            <option value="">— Sin ubicación —</option>
            {[1,2].map(a=>Object.entries(LOCS[a]||{}).map(([z,mods])=>Object.entries(mods).map(([m,lvls])=>lvls.map(lvl=>{const code=`A${a}-${z}${m}-N${lvl}`;return <option key={code} value={code}>{code}</option>;}))))}
          </select>
        </FG>
        <FG label="Estado">
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {Object.entries(STATUS).map(([k,cfg])=>(<button key={k} onClick={()=>set("estado",k)} style={{padding:"6px 12px",borderRadius:6,fontFamily:"inherit",border:`1px solid ${f.estado===k?cfg.c:C.border}`,background:f.estado===k?cfg.bg:C.s1,color:f.estado===k?cfg.c:C.t2,fontSize:12,fontWeight:600,cursor:"pointer"}}>{cfg.label}</button>))}
          </div>
        </FG>
        {f.tipo==="consumible"&&(<><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}><FG label="Stock actual"><input value={f.stock??""} onChange={e=>set("stock",e.target.value)} type="number" style={IS}/></FG><FG label="Stock mínimo"><input value={f.stockMin??""} onChange={e=>set("stockMin",e.target.value)} type="number" style={IS}/></FG></div><FG label="Precio unitario (€)"><input value={f.precio} onChange={e=>set("precio",e.target.value)} type="number" step="0.01" style={IS}/></FG></>)}
        {f.tipo==="herramienta"&&["en_uso","prestado"].includes(f.estado)&&(<FG label="Quién lo tiene"><input value={f.quien||""} onChange={e=>set("quien",e.target.value)} style={IS}/></FG>)}
        <FG label="Proveedor"><input value={f.proveedor||""} onChange={e=>set("proveedor",e.target.value)} placeholder="Ej: Bricomart, Leroy Merlin..." style={IS}/></FG>
        {f.tipo==="herramienta"&&(<FG label="Próxima revisión"><input type="date" value={f.proximaRevision||""} onChange={e=>set("proximaRevision",e.target.value||null)} style={IS}/></FG>)}
        <FG label="Notas"><textarea value={f.notas||""} onChange={e=>set("notas",e.target.value)} rows={3} style={{...IS,resize:"vertical"}}/></FG>
      </div>
      <div style={{padding:"12px 16px",borderTop:`1px solid ${C.border}`,flexShrink:0,background:C.s1}}>
        <button onClick={()=>ok&&onSave(f)} style={{width:"100%",padding:13,borderRadius:10,border:"none",fontFamily:"inherit",background:ok?C.navy:C.s2,color:ok?"#fff":C.t3,fontSize:14,fontWeight:700,cursor:ok?"pointer":"default"}}>Guardar cambios</button>
      </div>
    </div>
  );
}

function QRScanner({items,onClose,onItem}) {
  const videoRef=useRef(null); const canvasRef=useRef(null);
  const [error,setError]=useState(""); const [manual,setManual]=useState("");
  const [loaded,setLoaded]=useState(false); const [scanning,setScanning]=useState(false);
  const rafRef=useRef(null); const streamRef=useRef(null);
  useEffect(()=>{if(window.jsQR){setLoaded(true);return;}const script=document.createElement("script");script.src="https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js";script.onload=()=>setLoaded(true);script.onerror=()=>setError("No se pudo cargar el escáner.");document.head.appendChild(script);return()=>{try{document.head.removeChild(script)}catch(e){}};},[]);
  useEffect(()=>{if(!loaded)return;let active=true;const start=async()=>{try{const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment",width:{ideal:1280},height:{ideal:720}}});streamRef.current=stream;if(videoRef.current){videoRef.current.srcObject=stream;videoRef.current.play();setScanning(true);tick(active);}}catch(e){setError("No se puede acceder a la cámara.");}};start();return()=>{active=false;if(rafRef.current)cancelAnimationFrame(rafRef.current);streamRef.current?.getTracks().forEach(t=>t.stop());};},[loaded]);
  const tick=useCallback(async(active)=>{if(!active)return;const video=videoRef.current;const canvas=canvasRef.current;if(video&&canvas&&video.readyState===4&&window.jsQR){const ctx=canvas.getContext("2d");canvas.width=video.videoWidth;canvas.height=video.videoHeight;ctx.drawImage(video,0,0,canvas.width,canvas.height);const img=ctx.getImageData(0,0,canvas.width,canvas.height);const code=window.jsQR(img.data,img.width,img.height,{inversionAttempts:"dontInvert"});if(code?.data){handleCode(code.data);return;}}rafRef.current=requestAnimationFrame(()=>tick(active));},[]);
  const handleCode=useCallback(code=>{streamRef.current?.getTracks().forEach(t=>t.stop());if(rafRef.current)cancelAnimationFrame(rafRef.current);const trimmed=code.trim();const it=items.find(i=>i.id===trimmed||i.ubicacion===trimmed);if(it){onItem(it);onClose();}else setError(`Código "${trimmed}" no encontrado.`);},[items,onItem,onClose]);
  const tryManual=()=>{if(manual.trim())handleCode(manual.trim());};
  return (
    <div style={{position:"fixed",inset:0,background:"#000",zIndex:400,display:"flex",flexDirection:"column"}}>
      <canvas ref={canvasRef} style={{display:"none"}}/>
      <div style={{padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <span style={{color:"#fff",fontSize:16,fontWeight:700}}>Escáner QR</span>
        <button onClick={onClose} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:8,cursor:"pointer",padding:10,display:"flex"}}><X size={20} color="#fff"/></button>
      </div>
      <div style={{flex:1,position:"relative",overflow:"hidden"}}>
        <video ref={videoRef} autoPlay playsInline muted style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>
      </div>
      <div style={{background:C.s1,padding:"16px",flexShrink:0}}>
        {error&&<div style={{color:C.red,fontSize:12,marginBottom:12,padding:"8px 10px",background:C.redL,borderRadius:8}}>{error}</div>}
        <div style={{color:C.t2,fontSize:12,fontWeight:600,marginBottom:8}}>O introduce el código manualmente</div>
        <div style={{display:"flex",gap:8}}>
          <input value={manual} onChange={e=>setManual(e.target.value)} onKeyDown={e=>e.key==="Enter"&&tryManual()} placeholder="ej: h01 o A1-A1-N2" style={{...IS,flex:1,fontSize:16}}/>
          <button onClick={tryManual} style={{padding:"10px 14px",borderRadius:8,border:"none",background:C.navy,color:"#fff",fontFamily:"inherit",fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>Buscar</button>
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({title,message,confirmLabel,onConfirm,onClose,danger=true}) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{background:C.s1,borderRadius:18,padding:24,maxWidth:340,width:"100%",boxShadow:"0 8px 40px rgba(0,0,0,0.2)"}}>
        <div style={{width:48,height:48,borderRadius:14,background:danger?C.redL:C.navyL,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>{danger?<AlertTriangle size={24} color={C.red}/>:<Info size={24} color={C.navy}/>}</div>
        <div style={{color:C.t1,fontSize:16,fontWeight:700,marginBottom:8}}>{title}</div>
        <div style={{color:C.t2,fontSize:13,lineHeight:1.6,marginBottom:20}}>{message}</div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={onClose} style={{flex:1,padding:12,borderRadius:10,border:`1px solid ${C.border}`,fontFamily:"inherit",background:C.s2,color:C.t2,fontSize:13,fontWeight:600,cursor:"pointer"}}>Cancelar</button>
          <button onClick={()=>{onConfirm();onClose();}} style={{flex:1,padding:12,borderRadius:10,border:"none",fontFamily:"inherit",background:danger?C.red:C.navy,color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

function HistorialGlobal({movs,items}) {
  const [filtro,setFiltro]=useState("todos");
  const tipos={todos:"Todos",salida:"Salidas",entrada:"Entradas",uso:"Usos",edicion:"Ediciones"};
  const filtered=[...movs].reverse().filter(m=>filtro==="todos"||m.tipo===filtro);
  const MC={salida:C.navy,entrada:C.green,uso:C.navy,agotado:C.red,edicion:C.t2};
  const ML={salida:"Salida",entrada:"Entrada",uso:"Uso",agotado:"Agotado",edicion:"Edición"};
  const MI={salida:ArrowUp,entrada:ArrowDown,uso:Package,agotado:AlertTriangle,edicion:Edit2};
  return (
    <div style={{padding:"0 16px"}}>
      <div style={{display:"flex",gap:6,marginBottom:14,overflowX:"auto",paddingBottom:2}}>
        {Object.entries(tipos).map(([v,l])=>(<button key={v} onClick={()=>setFiltro(v)} style={{padding:"6px 12px",borderRadius:20,border:`1px solid ${filtro===v?C.navy:C.border}`,fontFamily:"inherit",background:filtro===v?C.navy:C.s1,color:filtro===v?"#fff":C.t2,fontSize:11,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>{l}</button>))}
      </div>
      <div style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden",boxShadow:C.shadow}}>
        {filtered.length===0?<div style={{color:C.t3,textAlign:"center",padding:"40px 0",fontSize:13}}>Sin movimientos</div>:filtered.map((mv,i)=>{
          const it=items.find(x=>x.id===mv.itemId);const MIco=MI[mv.tipo]||Info;const mc=MC[mv.tipo]||C.t2;
          return (<div key={mv.id} style={{padding:"12px 16px",borderBottom:i<filtered.length-1?`1px solid ${C.border}`:"none",display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:34,height:34,borderRadius:9,flexShrink:0,background:mc+"15",display:"flex",alignItems:"center",justifyContent:"center"}}><MIco size={15} color={mc}/></div>
            <div style={{flex:1,minWidth:0}}><div style={{color:C.t1,fontSize:12,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{it?it.nombre:<span style={{color:C.t3,fontStyle:"italic"}}>Eliminado</span>}</div><div style={{color:C.t3,fontSize:11,marginTop:2}}>{mv.nota}{mv.quien?" · "+mv.quien:""} · {mv.fecha}</div></div>
            <span style={{fontSize:10,fontWeight:600,color:mc,background:mc+"12",padding:"2px 7px",borderRadius:6,whiteSpace:"nowrap"}}>{ML[mv.tipo]||mv.tipo}</span>
          </div>);
        })}
      </div>
    </div>
  );
}

function generarEtiquetas() {
  const locs=[];
  for(const [a,zones] of Object.entries(LOCS))for(const [z,mods] of Object.entries(zones))for(const [m,lvls] of Object.entries(mods))for(const lvl of lvls)locs.push(`A${a}-${z}${m}-N${lvl}`);
  const html=`<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Etiquetas QR</title><style>body{font-family:'Segoe UI',sans-serif;padding:20px;}.grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;}.label{border:1.5px solid #E2E6F0;border-radius:10px;padding:10px;display:flex;flex-direction:column;align-items:center;gap:6px;}.code{font-size:9px;font-weight:700;color:#1C1475;font-family:monospace;}img{width:80px;height:80px;}button{background:#1C1475;color:#fff;border:none;padding:10px 20px;border-radius:8px;font-size:13px;cursor:pointer;margin-bottom:20px;}</style></head><body><button onclick="window.print()">Imprimir</button><div class="grid">${locs.map(code=>`<div class="label"><img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(code)}&color=1C1475"/><div class="code">${code}</div></div>`).join("")}</div></body></html>`;
  const w=window.open("","_blank");if(w){w.document.write(html);w.document.close();}
}

function AsignarModal({item,onClose,onDone}) {
  const [num,setNum]=useState(""); const [dist,setDist]=useState(""); const [cant,setCant]=useState("1");
  const [draft,setDraft]=useState(null); const [copied,setCopied]=useState(false);
  const distInfo=DISTRITOS.find(d=>d.nombre===dist);
  const numOk=/^\d{7}$/.test(num.trim()); const cantNum=parseInt(cant)||0;
  const total=item.precio?(item.precio*cantNum).toFixed(2):null;
  const canSend=numOk&&dist&&cantNum>0;
  const handleSend=()=>{if(!canSend)return;setDraft({to_email:distInfo.email,admin_nombre:distInfo.admin,trabajo_num:num.trim(),distrito:dist,articulo:item.nombre,cantidad:cantNum,precio:item.precio?.toFixed(2)||"—",total:total||"—",responsable:"Responsable almacén",fecha:fmtDate()});onDone({cant:cantNum});};
  const emailText=draft?`Para: ${draft.to_email}\nAsunto: Consumible asignado · Trabajo ${draft.trabajo_num}\n\nHola ${draft.admin_nombre},\n\nTrabajo: ${draft.trabajo_num}\nDistrito: ${draft.distrito}\nArtículo: ${draft.articulo}\nCantidad: ${draft.cantidad} ud.\nTotal: ${draft.total} €\nFecha: ${draft.fecha}`:"";
  const copy=()=>navigator.clipboard.writeText(emailText).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);});
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div style={{background:C.s1,borderRadius:"20px 20px 0 0",width:"100%",maxWidth:430,maxHeight:"90vh",display:"flex",flexDirection:"column",boxShadow:"0 -8px 40px rgba(0,0,0,0.15)"}}>
        <div style={{padding:"16px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div><div style={{color:C.t1,fontSize:16,fontWeight:700}}>Asignar a trabajo</div><div style={{color:C.t3,fontSize:12,marginTop:2}}>{item.nombre}</div></div>
          <button onClick={onClose} style={{background:C.s2,border:`1px solid ${C.border}`,borderRadius:8,cursor:"pointer",padding:6,display:"flex"}}><X size={16} color={C.t2}/></button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:18}}>
          {draft?(<div style={{display:"flex",flexDirection:"column",gap:12}}>
            <div style={{background:C.greenL,border:`1px solid ${C.green}30`,borderRadius:10,padding:"12px 14px",display:"flex",alignItems:"center",gap:8}}><CheckCircle size={18} color={C.green}/><div><div style={{color:C.green,fontSize:13,fontWeight:700}}>Stock descontado</div><div style={{color:C.t2,fontSize:11}}>−{cantNum} ud.</div></div></div>
            <div style={{background:C.s2,border:`1px solid ${C.border}`,borderRadius:10,padding:14,fontFamily:"monospace",fontSize:11,color:C.t1,lineHeight:1.8,whiteSpace:"pre-wrap"}}>{emailText}</div>
            <button onClick={copy} style={{width:"100%",padding:12,borderRadius:10,border:`1px solid ${C.border}`,fontFamily:"inherit",background:copied?C.greenL:C.s1,color:copied?C.green:C.navy,fontSize:13,fontWeight:700,cursor:"pointer"}}>{copied?"✓ Copiado":"Copiar correo"}</button>
          </div>):(<>
            <FG label="Número de trabajo (7 dígitos)"><input value={num} onChange={e=>setNum(e.target.value.replace(/\D/g,"").slice(0,7))} placeholder="0000000" maxLength={7} style={{...IS,textAlign:"center",fontSize:18,fontWeight:700,letterSpacing:"3px"}}/></FG>
            <FG label="Distrito"><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{DISTRITOS.map(d=>(<button key={d.nombre} onClick={()=>setDist(d.nombre)} style={{padding:"7px 12px",borderRadius:6,fontFamily:"inherit",border:`1px solid ${dist===d.nombre?C.navy:C.border}`,background:dist===d.nombre?C.navyL:C.s2,color:dist===d.nombre?C.navy:C.t2,fontSize:12,fontWeight:600,cursor:"pointer"}}>{d.nombre}</button>))}</div></FG>
            <FG label="Cantidad"><div style={{display:"flex",alignItems:"center",gap:10}}><button onClick={()=>setCant(c=>String(Math.max(1,parseInt(c)-1)))} style={{width:40,height:40,borderRadius:8,border:`1px solid ${C.border}`,background:C.s2,color:C.t1,fontSize:20,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>−</button><input value={cant} onChange={e=>setCant(e.target.value.replace(/\D/g,""))} style={{...IS,textAlign:"center",fontSize:18,fontWeight:700,width:70,flexShrink:0}}/><button onClick={()=>setCant(c=>String(parseInt(c)+1))} style={{width:40,height:40,borderRadius:8,border:`1px solid ${C.border}`,background:C.s2,color:C.t1,fontSize:20,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>+</button></div></FG>
          </>)}
        </div>
        {!draft&&<div style={{padding:"12px 18px",borderTop:`1px solid ${C.border}`,flexShrink:0}}><button onClick={handleSend} disabled={!canSend} style={{width:"100%",padding:13,borderRadius:10,border:"none",fontFamily:"inherit",background:canSend?C.navy:C.s2,color:canSend?"#fff":C.t3,fontSize:14,fontWeight:700,cursor:canSend?"pointer":"default"}}>{canSend?"Registrar y generar borrador":"Completa todos los campos"}</button></div>}
      </div>
    </div>
  );
}

function DR({icon,label,value,multi}) {
  return (<div style={{display:"flex",alignItems:multi?"flex-start":"center",gap:10,padding:"9px 0",borderBottom:`1px solid ${C.border}`}}><div style={{marginTop:multi?2:0,flexShrink:0}}>{icon}</div><div style={{flex:1}}><div style={{color:C.t3,fontSize:10,marginBottom:2}}>{label}</div><div style={{color:C.t1,fontSize:13,fontWeight:500,lineHeight:1.5}}>{value}</div></div></div>);
}

function ItemDetail({item:init,items,setItems,setSelItem,movs,addMov,onEdit}) {
  const item=items.find(i=>i.id===init.id)||init;
  const isC=item.tipo==="consumible";
  const isLow=isC&&item.stock!==null&&item.stock>0&&item.stock<=item.stockMin;
  const isOut=isC&&item.stock===0;
  const isFuera=["en_uso","prestado"].includes(item.estado);
  const upd=patch=>setItems(p=>p.map(i=>i.id===item.id?{...i,...patch}:i));
  const [tab,setTab]=useState("info");
  const [salidaOpen,setSalidaOpen]=useState(false);
  const [devOpen,setDevOpen]=useState(false);
  const [asignarOpen,setAsignarOpen]=useState(false);
  const [confirm,setConfirm]=useState(null);
  const photoRef=useRef(null);
  const itemMovs=movs.filter(m=>m.itemId===item.id);
  const handleEstado=e=>{if(["tirar","perdido"].includes(e)&&item.estado!==e){setConfirm({estado:e});}else{upd({estado:e});addMov({itemId:item.id,tipo:"edicion",quien:"Responsable",nota:`Estado → ${STATUS[e]?.label||e}`,fecha:"Ahora"});}};
  const chgStock=d=>{const newStock=Math.max(0,(item.stock||0)+d);const patch={stock:newStock};if(newStock===0&&d<0){patch.estado="tirar";addMov({itemId:item.id,tipo:"agotado",quien:"Responsable",nota:"Stock agotado",fecha:fmtDate()});solicitarNotificacion("⚠ Stock agotado",`${item.nombre} sin stock.`);}upd(patch);if(d<0&&newStock>0)addMov({itemId:item.id,tipo:"uso",quien:"Responsable",nota:"Descuento manual",fecha:fmtDate(),cantidad:Math.abs(d)});};
  const handlePhoto=e=>{const file=e.target.files?.[0];if(!file)return;const r=new FileReader();r.onload=ev=>{const fotos=[...(item.fotos||[]),ev.target.result].slice(0,5);upd({fotos});};r.readAsDataURL(file);};
  const handleSalida=({quien,nota,estado})=>{upd({estado,quien,desde:fmtDate()});addMov({itemId:item.id,tipo:"salida",quien,nota:nota||"Sin destino",fecha:"Ahora"});setSalidaOpen(false);};
  const handleDevolucion=({estadoRet,nota})=>{upd({estado:estadoRet,quien:null,desde:null,notas:nota?`Devolución: ${nota}`:item.notas});addMov({itemId:item.id,tipo:"entrada",quien:item.quien||"—",nota:nota||"Devuelto al almacén",fecha:"Ahora"});setDevOpen(false);};
  const handleAsignar=({cant})=>{upd({stock:Math.max(0,(item.stock||0)-cant)});addMov({itemId:item.id,tipo:"uso",quien:"Responsable almacén",nota:`${cant} ud. asignadas`,fecha:"Ahora",cantidad:cant});};
  const MC={salida:C.navy,entrada:C.green,uso:C.navy,agotado:C.red,edicion:C.t2};
  const ML={salida:"Salida",entrada:"Entrada",uso:"Uso",agotado:"Agotado",edicion:"Edición"};
  const MI={salida:ArrowUp,entrada:ArrowDown,uso:Package,agotado:AlertTriangle,edicion:Edit2};
  return (
    <div style={{padding:"0 16px"}}>
      <div style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:14,padding:16,marginBottom:12,boxShadow:C.shadow}}>
        <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:14}}>
          <div style={{position:"relative",flexShrink:0}}>
            {(item.fotos||[]).length>0?<div style={{display:"flex",gap:4}}>{(item.fotos||[]).slice(0,3).map((f,i)=>(<img key={i} src={f} alt="" style={{width:i===0?56:36,height:i===0?56:36,borderRadius:i===0?14:10,objectFit:"cover",flexShrink:0}}/>))}</div>:<div style={{width:56,height:56,borderRadius:14,background:isC?C.greenL:C.navyL,display:"flex",alignItems:"center",justifyContent:"center"}}>{isC?<Package size={24} color={C.green}/>:<Wrench size={24} color={C.navy}/>}</div>}
            <button onClick={()=>photoRef.current?.click()} style={{position:"absolute",bottom:-4,right:-4,width:22,height:22,borderRadius:"50%",background:C.navy,border:"2px solid "+C.s1,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Camera size={11} color="#fff"/></button>
            <input ref={photoRef} type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={handlePhoto}/>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{color:C.t3,fontSize:10,marginBottom:3}}>{item.cat}</div>
            <div style={{color:C.t1,fontSize:15,fontWeight:700,lineHeight:1.3,marginBottom:8}}>{item.nombre}</div>
            <Chip estado={item.estado}/>
          </div>
          <button onClick={onEdit} style={{background:C.navyL,border:"none",borderRadius:8,cursor:"pointer",padding:"6px 10px",display:"flex",alignItems:"center",gap:4,color:C.navy,fontSize:11,fontWeight:600,fontFamily:"inherit",flexShrink:0}}><Edit2 size={12}/>Editar</button>
        </div>
        <div style={{display:"flex",gap:0,borderBottom:`1px solid ${C.border}`,marginBottom:12}}>
          {[["info","Info"],["historial",`Historial (${itemMovs.length})`]].map(([v,l])=>(<button key={v} onClick={()=>setTab(v)} style={{flex:1,padding:"8px 0",border:"none",fontFamily:"inherit",cursor:"pointer",background:"transparent",color:tab===v?C.navy:C.t3,fontSize:12,fontWeight:tab===v?700:400,borderBottom:`2px solid ${tab===v?C.navy:"transparent"}`,marginBottom:-1}}>{l}</button>))}
        </div>
        {tab==="info"&&(<div style={{display:"flex",flexDirection:"column"}}>
          {item.ubicacion&&<DR icon={<MapPin size={13} color={C.navy}/>} label="Ubicación" value={item.ubicacion}/>}
          {item.quien&&<DR icon={<User size={13} color={C.t2}/>} label={item.estado==="prestado"?"Prestado a":"Lo tiene"} value={item.quien}/>}
          {item.desde&&<DR icon={<Clock size={13} color={C.t2}/>} label="Desde" value={item.desde}/>}
          {isC&&item.precio&&<DR icon={<TrendingUp size={13} color={C.navy}/>} label="Precio unitario" value={`${item.precio.toFixed(2)} €`}/>}
          {item.proveedor&&<DR icon={<Building2 size={13} color={C.t2}/>} label="Proveedor" value={item.proveedor}/>}
          {item.notas&&<DR icon={<Info size={13} color={C.t3}/>} label="Notas" value={item.notas} multi/>}
        </div>)}
        {tab==="historial"&&(<div>{itemMovs.length===0?<div style={{color:C.t3,fontSize:12,textAlign:"center",padding:"16px 0"}}>Sin movimientos</div>:itemMovs.slice().reverse().map((mv,i)=>{const MIco=MI[mv.tipo]||Info;const mc=MC[mv.tipo]||C.t2;return(<div key={mv.id} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:i<itemMovs.length-1?`1px solid ${C.border}`:"none"}}><div style={{width:28,height:28,borderRadius:8,flexShrink:0,background:mc+"15",display:"flex",alignItems:"center",justifyContent:"center"}}><MIco size={13} color={mc}/></div><div style={{flex:1,minWidth:0}}><div style={{color:C.t1,fontSize:12,fontWeight:600}}>{mv.nota}</div><div style={{color:C.t3,fontSize:11,marginTop:1}}>{mv.quien} · {mv.fecha}</div></div><span style={{fontSize:10,fontWeight:600,color:mc,background:mc+"12",padding:"2px 7px",borderRadius:6}}>{ML[mv.tipo]||mv.tipo}</span></div>);})}</div>)}
      </div>
      {isC&&item.stock!==null&&(<div style={{background:C.s1,border:`1px solid ${isOut||isLow?C.red+"40":C.border}`,borderLeft:`3px solid ${isOut||isLow?C.red:C.green}`,borderRadius:12,padding:"14px 16px",marginBottom:12,boxShadow:C.shadow}}>
        <Lbl>Control de stock</Lbl>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{flex:1}}><div style={{color:isOut||isLow?C.red:C.t1,fontSize:36,fontWeight:900,lineHeight:1}}>{item.stock}</div><div style={{color:isOut||isLow?C.red:C.t3,fontSize:11,marginTop:4}}>{isOut?"Agotado":isLow?`Stock bajo · mín. ${item.stockMin}`:`Mínimo: ${item.stockMin}`}</div></div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>chgStock(-1)} style={{width:44,height:44,borderRadius:10,border:`1px solid ${C.red}40`,background:C.redL,color:C.red,fontSize:22,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit"}}>−</button>
            <button onClick={()=>chgStock(1)} style={{width:44,height:44,borderRadius:10,border:`1px solid ${C.green}40`,background:C.greenL,color:C.green,fontSize:22,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit"}}>+</button>
          </div>
        </div>
      </div>)}
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
        {item.tipo==="herramienta"&&!isFuera&&(<button onClick={()=>setSalidaOpen(true)} style={{background:C.navy,borderRadius:12,padding:"14px 16px",border:"none",display:"flex",alignItems:"center",gap:12,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 4px 16px rgba(28,20,117,0.25)"}}><div style={{width:36,height:36,borderRadius:9,background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center"}}><ArrowUp size={17} color="#fff"/></div><div style={{flex:1,textAlign:"left"}}><div style={{color:"#fff",fontSize:13,fontWeight:700}}>Registrar salida</div><div style={{color:"rgba(255,255,255,0.6)",fontSize:11,marginTop:1}}>Indicar quién se la lleva</div></div><ChevronRight size={14} color="rgba(255,255,255,0.4)"/></button>)}
        {item.tipo==="herramienta"&&isFuera&&(<button onClick={()=>setDevOpen(true)} style={{background:C.green,borderRadius:12,padding:"14px 16px",border:"none",display:"flex",alignItems:"center",gap:12,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 4px 16px rgba(79,168,0,0.25)"}}><div style={{width:36,height:36,borderRadius:9,background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center"}}><ArrowDown size={17} color="#fff"/></div><div style={{flex:1,textAlign:"left"}}><div style={{color:"#fff",fontSize:13,fontWeight:700}}>Registrar devolución</div><div style={{color:"rgba(255,255,255,0.6)",fontSize:11,marginTop:1}}>Marcar como devuelta</div></div><ChevronRight size={14} color="rgba(255,255,255,0.4)"/></button>)}
        {isC&&(<button onClick={()=>setAsignarOpen(true)} style={{background:C.navy,borderRadius:12,padding:"14px 16px",border:"none",display:"flex",alignItems:"center",gap:12,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 4px 16px rgba(28,20,117,0.25)"}}><div style={{width:36,height:36,borderRadius:9,background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center"}}><ClipboardList size={17} color="#fff"/></div><div style={{flex:1,textAlign:"left"}}><div style={{color:"#fff",fontSize:13,fontWeight:700}}>Asignar a trabajo</div><div style={{color:"rgba(255,255,255,0.6)",fontSize:11,marginTop:1}}>Registrar uso y notificar</div></div><ChevronRight size={14} color="rgba(255,255,255,0.4)"/></button>)}
      </div>
      <div style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px",marginBottom:12,boxShadow:C.shadow}}>
        <Lbl>Cambiar estado</Lbl>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{Object.entries(STATUS).map(([key,cfg])=>(<button key={key} onClick={()=>handleEstado(key)} style={{padding:"6px 12px",borderRadius:6,fontFamily:"inherit",border:`1px solid ${item.estado===key?cfg.c:C.border}`,background:item.estado===key?cfg.bg:C.s1,color:item.estado===key?cfg.c:C.t2,fontSize:12,fontWeight:600,cursor:"pointer"}}>{cfg.label}</button>))}</div>
      </div>
      <button onClick={()=>setConfirm({tipo:"eliminar"})} style={{width:"100%",padding:"13px 16px",borderRadius:12,border:`1px solid ${C.red}30`,background:C.redL,display:"flex",alignItems:"center",gap:12,cursor:"pointer",fontFamily:"inherit",marginBottom:24}}>
        <div style={{width:36,height:36,borderRadius:9,background:C.red+"20",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Trash2 size={17} color={C.red}/></div>
        <div style={{flex:1,textAlign:"left"}}><div style={{color:C.red,fontSize:13,fontWeight:700}}>Eliminar artículo</div><div style={{color:C.red,fontSize:11,opacity:0.7,marginTop:1}}>Se borrará permanentemente</div></div>
      </button>
      {salidaOpen&&<SalidaModal item={item} onClose={()=>setSalidaOpen(false)} onConfirm={handleSalida}/>}
      {devOpen&&<DevolucionModal item={item} onClose={()=>setDevOpen(false)} onConfirm={handleDevolucion}/>}
      {asignarOpen&&<AsignarModal item={item} onClose={()=>setAsignarOpen(false)} onDone={handleAsignar}/>}
      {confirm&&<ConfirmModal title={confirm.tipo==="eliminar"?"Eliminar artículo":`Marcar como "${STATUS[confirm.estado]?.label}"`} message={confirm.tipo==="eliminar"?"¿Seguro que quieres eliminar este artículo?":"Esta acción quedará registrada."} confirmLabel={confirm.tipo==="eliminar"?"Sí, eliminar":"Sí, confirmar"} onConfirm={()=>{if(confirm.tipo==="eliminar"){setItems(p=>p.filter(i=>i.id!==item.id));setSelItem(null);}else{upd({estado:confirm.estado});addMov({itemId:item.id,tipo:"edicion",quien:"Responsable",nota:`Estado → ${STATUS[confirm.estado]?.label}`,fecha:"Ahora"});}}} onClose={()=>setConfirm(null)} danger/>}
    </div>
  );
}

function Dashboard({items,movs,onItem,goTo}) {
  const total=items.length;const fuera=items.filter(i=>["en_uso","prestado"].includes(i.estado)).length;
  const bajo=items.filter(i=>i.tipo==="consumible"&&i.stock!==null&&i.stock<=i.stockMin).length;
  const pend=items.filter(i=>["tirar","revisar","reubicar","venta","reparacion","roto"].includes(i.estado)).length;
  const alertStock=items.filter(i=>i.tipo==="consumible"&&i.stock!==null&&i.stock<=i.stockMin);
  const ferrFuera=items.filter(i=>i.tipo==="herramienta"&&["en_uso","prestado"].includes(i.estado));
  const stats=[{v:total,label:"Artículos",go:"inventario",alert:false},{v:fuera,label:"Fuera",go:"herramientas",alert:fuera>0},{v:bajo,label:"Stock bajo",go:"inventario",alert:bajo>0},{v:pend,label:"Pendientes",go:"pendientes",alert:pend>0}];
  return (
    <div style={{padding:"0 16px"}}>
      <div style={{marginBottom:16,paddingTop:2}}><div style={{color:C.t4,fontSize:10,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",marginBottom:4}}>Panel de control</div><div style={{color:C.t1,fontSize:22,fontWeight:800,letterSpacing:"-0.6px"}}>Almacén Aldago</div></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16}}>
        {stats.map((s,i)=>(<div key={i} onClick={()=>goTo(s.go)} style={{background:C.s1,border:`1px solid ${s.alert?C.redBorder:C.border}`,borderTop:`2px solid ${s.alert?C.red:i===0?C.navy:C.border}`,borderRadius:10,padding:"12px 8px 10px",cursor:"pointer",textAlign:"center",boxShadow:C.shadow}}><div style={{color:s.alert?C.red:C.navy,fontSize:26,fontWeight:800,lineHeight:1}}>{s.v}</div><div style={{color:C.t4,fontSize:9,marginTop:5,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px"}}>{s.label}</div></div>))}
      </div>
      {alertStock.length>0&&(<div onClick={()=>goTo("inventario")} style={{background:C.s1,border:`1px solid ${C.redBorder}`,borderLeft:`3px solid ${C.red}`,borderRadius:10,padding:"13px 14px",marginBottom:12,cursor:"pointer",boxShadow:C.shadow}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><AlertTriangle size={16} color={C.red}/><div style={{flex:1}}><div style={{color:C.red,fontSize:13,fontWeight:700}}>Stock bajo o agotado</div><div style={{color:C.red,fontSize:11,opacity:0.75,marginTop:1}}>{alertStock.length} consumible{alertStock.length>1?"s":""} requieren reposición</div></div><ChevronRight size={14} color={C.red}/></div>
        {alertStock.slice(0,3).map(it=>(<div key={it.id} style={{display:"flex",alignItems:"center",padding:"5px 0",borderTop:`1px solid ${C.redBorder}`}}><span style={{color:C.t2,fontSize:12,flex:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{it.nombre}</span><span style={{color:C.red,fontSize:11,fontWeight:700,fontFamily:"'DM Mono',monospace"}}>{it.stock===0?"AGOTADO":`${it.stock} ud.`}</span></div>))}
      </div>)}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
        <button onClick={()=>goTo("revision")} style={{background:C.navy,border:"none",borderRadius:10,padding:"14px 12px",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:10,boxShadow:"0 4px 14px rgba(28,20,117,0.28)"}}><ClipboardList size={18} color="#fff" strokeWidth={1.8}/><div style={{textAlign:"left"}}><div style={{color:"#fff",fontSize:12,fontWeight:700}}>Revisión guiada</div><div style={{color:"rgba(255,255,255,0.55)",fontSize:10,marginTop:1}}>Recorre el almacén</div></div></button>
        <button onClick={generarEtiquetas} style={{background:C.green,border:"none",borderRadius:10,padding:"14px 12px",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:10,boxShadow:"0 4px 14px rgba(79,168,0,0.28)"}}><Printer size={18} color="#fff" strokeWidth={1.8}/><div style={{textAlign:"left"}}><div style={{color:"#fff",fontSize:12,fontWeight:700}}>Etiquetas QR</div><div style={{color:"rgba(255,255,255,0.55)",fontSize:10,marginTop:1}}>Imprimir ubicaciones</div></div></button>
        <button onClick={()=>exportarExcel(items,movs)} style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:10,padding:"14px 12px",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:10,boxShadow:C.shadow,gridColumn:"span 2"}}><Download size={18} color={C.navy} strokeWidth={1.8}/><div style={{textAlign:"left"}}><div style={{color:C.navy,fontSize:12,fontWeight:700}}>Exportar inventario</div><div style={{color:C.t3,fontSize:10,marginTop:1}}>Excel con herramientas, consumibles e historial</div></div></button>
      </div>
      {ferrFuera.length>0&&(<div style={{marginBottom:12}}><Lbl>Herramientas fuera</Lbl><div style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:10,overflow:"hidden",boxShadow:C.shadow}}>{ferrFuera.slice(0,3).map((it,i)=>(<div key={it.id} onClick={()=>onItem(it)} style={{padding:"11px 14px",cursor:"pointer",borderBottom:i<Math.min(ferrFuera.length,3)-1?`1px solid ${C.border}`:"none",display:"flex",alignItems:"center",gap:10}}><div style={{width:32,height:32,borderRadius:8,background:C.navyL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Wrench size={14} color={C.navy}/></div><div style={{flex:1,minWidth:0}}><div style={{color:C.t1,fontSize:12,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{it.nombre}</div><div style={{color:C.navy,fontSize:11,marginTop:1}}>{it.quien} · desde {it.desde}</div></div><Chip estado={it.estado} small/></div>))}</div></div>)}
      <div style={{marginBottom:24}}><Lbl>Actividad reciente</Lbl><div style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:10,overflow:"hidden",boxShadow:C.shadow}}>{movs.slice(-5).reverse().map((mv,i,arr)=>{const it=items.find(x=>x.id===mv.itemId);if(!it)return null;const mc={salida:C.navy,entrada:C.green,uso:C.navy,agotado:C.red,edicion:C.t3};const ml={salida:"Salida",entrada:"Entrada",uso:"Uso",agotado:"Agotado",edicion:"Edición"};const MI2={salida:ArrowUp,entrada:ArrowDown,uso:Package,agotado:AlertTriangle,edicion:Edit2};const MIco=MI2[mv.tipo]||Info;return(<div key={mv.id} style={{padding:"10px 14px",borderBottom:i<arr.length-1?`1px solid ${C.border}`:"none",display:"flex",alignItems:"center",gap:10}}><div style={{width:28,height:28,borderRadius:7,flexShrink:0,background:(mc[mv.tipo]||C.t3)+"12",display:"flex",alignItems:"center",justifyContent:"center"}}><MIco size={13} color={mc[mv.tipo]||C.t3}/></div><div style={{flex:1,minWidth:0}}><div style={{color:C.t1,fontSize:12,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{it.nombre}</div><div style={{color:C.t4,fontSize:10,marginTop:1}}>{mv.nota} · {mv.fecha}</div></div><span style={{fontSize:9,fontWeight:700,color:mc[mv.tipo]||C.t3,background:(mc[mv.tipo]||C.t3)+"12",padding:"2px 6px",borderRadius:5,whiteSpace:"nowrap",textTransform:"uppercase"}}>{ml[mv.tipo]||mv.tipo}</span></div>);})}</div></div>
    </div>
  );
}

function Inventario({items,onItem,setItems}) {
  const [tipo,setTipo]=useState("todos"); const [q,setQ]=useState(""); const [selCats,setSelCats]=useState([]);
  const [open,setOpen]=useState(false); const [sort,setSort]=useState("nombre"); const [multiMode,setMultiMode]=useState(false);
  const [selected,setSelected]=useState(new Set()); const [importing,setImporting]=useState(false);
  const allCats=[...new Set(items.map(i=>i.cat).filter(Boolean))].sort();
  const toggleCat=c=>setSelCats(p=>p.includes(c)?p.filter(x=>x!==c):[...p,c]);
  const activeCount=(tipo!=="todos"?1:0)+selCats.length;
  const clearAll=()=>{setTipo("todos");setSelCats([]);};
  const filtered=items.filter(it=>(tipo==="todos"||it.tipo===tipo)&&(selCats.length===0||selCats.includes(it.cat))&&(!q||it.nombre.toLowerCase().includes(q.toLowerCase())||it.cat?.toLowerCase().includes(q.toLowerCase())||it.ubicacion?.toLowerCase().includes(q.toLowerCase())));
  const sorted=[...filtered].sort((a,b)=>{if(sort==="nombre")return a.nombre.localeCompare(b.nombre);if(sort==="stock")return(a.stock??999)-(b.stock??999);if(sort==="cat")return(a.cat||"").localeCompare(b.cat||"");if(sort==="ubicacion")return(a.ubicacion||"ZZZ").localeCompare(b.ubicacion||"ZZZ");return 0;});
  const toggleSel=id=>setSelected(p=>{const n=new Set(p);n.has(id)?n.delete(id):n.add(id);return n;});
  const allSel=sorted.length>0&&sorted.every(i=>selected.has(i.id));
  const toggleAll=()=>setSelected(allSel?new Set():new Set(sorted.map(i=>i.id)));
  const applyBulk=action=>{if(action==="delete"){setItems(p=>p.filter(i=>!selected.has(i.id)));}else{setItems(p=>p.map(i=>selected.has(i.id)?{...i,estado:action}:i));}setSelected(new Set());setMultiMode(false);};
  return (
    <div style={{padding:"0 16px"}}>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        <div style={{flex:1,display:"flex",alignItems:"center",gap:8,background:C.s1,border:`1px solid ${C.border}`,borderRadius:10,padding:"9px 12px",boxShadow:C.shadow}}><Search size={15} color={C.t3}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar..." style={{flex:1,background:"transparent",border:"none",outline:"none",color:C.t1,fontSize:13,fontFamily:"'DM Sans',sans-serif"}}/>{q&&<button onClick={()=>setQ("")} style={{background:"none",border:"none",cursor:"pointer",padding:0,display:"flex"}}><X size={13} color={C.t3}/></button>}</div>
        <button onClick={()=>setOpen(o=>!o)} style={{display:"flex",alignItems:"center",gap:5,padding:"9px 11px",borderRadius:10,fontFamily:"inherit",cursor:"pointer",border:`1.5px solid ${open||activeCount>0?C.navy:C.border}`,background:open||activeCount>0?C.navyL:C.s1,color:open||activeCount>0?C.navy:C.t2,fontSize:12,fontWeight:600,boxShadow:C.shadow}}><Filter size={14}/>{activeCount>0&&<span style={{background:C.navy,color:"#fff",fontSize:9,fontWeight:700,width:16,height:16,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>{activeCount}</span>}</button>
        <button onClick={()=>{setMultiMode(m=>!m);setSelected(new Set());}} style={{display:"flex",alignItems:"center",padding:"9px 11px",borderRadius:10,fontFamily:"inherit",cursor:"pointer",border:`1.5px solid ${multiMode?C.navy:C.border}`,background:multiMode?C.navyL:C.s1,color:multiMode?C.navy:C.t2,fontSize:12,fontWeight:600,boxShadow:C.shadow}}><CheckSquare size={14}/></button>
        <button onClick={()=>setImporting(true)} style={{display:"flex",alignItems:"center",padding:"9px 11px",borderRadius:10,fontFamily:"inherit",cursor:"pointer",border:`1.5px solid ${C.border}`,background:C.s1,color:C.t2,fontSize:12,fontWeight:600,boxShadow:C.shadow}}><Download size={14}/></button>
      </div>
      {importing&&<ImportModal onClose={()=>setImporting(false)} onImport={newItems=>{setItems(p=>[...p,...newItems]);setImporting(false);}}/>}
      {open&&(<div style={{background:C.s1,border:`1px solid ${C.navyBorder}`,borderRadius:12,padding:"14px",marginBottom:10,boxShadow:C.shadowMd}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}><span style={{color:C.navy,fontSize:13,fontWeight:700}}>Filtrar</span>{activeCount>0&&<button onClick={clearAll} style={{background:"none",border:"none",cursor:"pointer",color:C.red,fontSize:11,fontWeight:600,fontFamily:"inherit",padding:0}}><X size={10}/>Limpiar</button>}</div>
        <div style={{display:"flex",gap:6,marginBottom:14}}>{[["todos","Todos"],["herramienta","🔧 Herramientas"],["consumible","📦 Consumibles"]].map(([v,l])=>(<button key={v} onClick={()=>setTipo(v)} style={{flex:1,padding:"7px 4px",borderRadius:8,border:`1.5px solid ${tipo===v?C.navy:C.border}`,fontFamily:"inherit",background:tipo===v?C.navy:C.s2,color:tipo===v?"#fff":C.t2,fontSize:11,fontWeight:600,cursor:"pointer"}}>{l}</button>))}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>{allCats.map(c=>{const sel=selCats.includes(c);const cnt=items.filter(i=>i.cat===c&&(tipo==="todos"||i.tipo===tipo)).length;return<button key={c} onClick={()=>toggleCat(c)} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:20,fontFamily:"inherit",cursor:"pointer",border:`1.5px solid ${sel?C.navy:C.border}`,background:sel?C.navy:C.s2,color:sel?"#fff":C.t2,fontSize:11,fontWeight:600}}>{c}<span style={{opacity:0.55}}>({cnt})</span></button>;})}</div>
        <button onClick={()=>setOpen(false)} style={{width:"100%",padding:"10px",borderRadius:10,border:"none",fontFamily:"inherit",background:C.navy,color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>Ver {sorted.length} resultado{sorted.length!==1?"s":""}</button>
      </div>)}
      {multiMode&&selected.size>0&&(<div style={{background:C.navy,borderRadius:10,padding:"10px 14px",marginBottom:10,display:"flex",alignItems:"center",gap:10,boxShadow:C.shadowMd}}><span style={{color:"#fff",fontSize:12,fontWeight:600,flex:1}}>{selected.size} seleccionado{selected.size>1?"s":""}</span><select onChange={e=>e.target.value&&applyBulk(e.target.value)} defaultValue="" style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",padding:"6px 10px",borderRadius:6,fontSize:12,fontFamily:"inherit",cursor:"pointer"}}><option value="" style={{color:"#000"}}>Cambiar estado...</option>{Object.entries(STATUS).map(([k,v])=><option key={k} value={k} style={{color:"#000"}}>{v.label}</option>)}<option value="delete" style={{color:"#C0392B"}}>🗑 Eliminar</option></select><button onClick={()=>{setSelected(new Set());setMultiMode(false);}} style={{background:"none",border:"none",cursor:"pointer",padding:4}}><X size={16} color="rgba(255,255,255,0.7)"/></button></div>)}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
        <span style={{color:C.t3,fontSize:11}}>{sorted.length} artículo{sorted.length!==1?"s":""}</span>
        <div style={{position:"relative"}}><select value={sort} onChange={e=>setSort(e.target.value)} style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:8,padding:"5px 26px 5px 10px",color:C.t2,fontSize:11,fontWeight:600,fontFamily:"inherit",cursor:"pointer",outline:"none",appearance:"none",WebkitAppearance:"none"}}>{[["nombre","Nombre A-Z"],["stock","Stock ↑"],["cat","Categoría"],["ubicacion","Ubicación"]].map(([v,l])=><option key={v} value={v}>{l}</option>)}</select><ChevronDown size={12} color={C.t3} style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}/></div>
      </div>
      {(()=>{
        const herr=sorted.filter(i=>i.tipo==="herramienta");const cons=sorted.filter(i=>i.tipo==="consumible");
        if(tipo!=="todos"||sorted.length===0)return(<div style={{display:"flex",flexDirection:"column",gap:6}}>{sorted.map(it=><ItemRow key={it.id} item={it} onClick={multiMode?()=>toggleSel(it.id):onItem} selected={selected.has(it.id)} onSelect={multiMode?toggleSel:null}/>)}{!sorted.length&&<Empty text="Sin resultados"/>}</div>);
        return(<>{herr.length>0&&(<div style={{marginBottom:16}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><div style={{width:3,height:16,borderRadius:2,background:C.navy}}/><Wrench size={13} color={C.navy}/><span style={{color:C.navy,fontSize:11,fontWeight:700,letterSpacing:"0.8px",textTransform:"uppercase"}}>Herramientas</span><span style={{background:C.navyL,color:C.navy,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:10}}>{herr.length}</span></div><div style={{display:"flex",flexDirection:"column",gap:6}}>{herr.map(it=><ItemRow key={it.id} item={it} onClick={multiMode?()=>toggleSel(it.id):onItem} selected={selected.has(it.id)} onSelect={multiMode?toggleSel:null}/>)}</div></div>)}{cons.length>0&&(<div style={{marginBottom:16}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><div style={{width:3,height:16,borderRadius:2,background:C.green}}/><Package size={13} color={C.green}/><span style={{color:C.green,fontSize:11,fontWeight:700,letterSpacing:"0.8px",textTransform:"uppercase"}}>Consumibles</span><span style={{background:C.greenL,color:C.green,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:10}}>{cons.length}</span></div><div style={{display:"flex",flexDirection:"column",gap:6}}>{cons.map(it=><ItemRow key={it.id} item={it} onClick={multiMode?()=>toggleSel(it.id):onItem} selected={selected.has(it.id)} onSelect={multiMode?toggleSel:null}/>)}</div></div>)}</>);
      })()}
    </div>
  );
}

function Breadcrumb({parts,onBack}) {
  return (<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}><button onClick={onBack} style={{background:C.navy,border:"none",color:"#fff",cursor:"pointer",padding:"6px 12px",borderRadius:8,fontSize:12,fontWeight:600,fontFamily:"inherit",display:"flex",alignItems:"center",gap:4}}><ChevronLeft size={13}/>Atrás</button>{parts.map((p,i)=>(<span key={i} style={{display:"flex",alignItems:"center",gap:8}}>{i>0&&<ChevronRight size={11} color={C.t4}/>}<span style={{color:i===parts.length-1?C.t1:C.t3,fontSize:12,fontWeight:i===parts.length-1?600:400}}>{p}</span></span>))}</div>);
}

function Ubicaciones({items,onItem}) {
  const [alm,setAlm]=useState(null);const [zona,setZona]=useState(null);const [mod,setMod]=useState(null);
  if(mod&&zona&&alm){const levels=LOCS[alm]?.[zona]?.[mod]||[];return(<div style={{padding:"0 16px"}}><Breadcrumb parts={[`Almacén ${alm}`,`Zona ${zona}`,`Módulo ${mod}`]} onBack={()=>setMod(null)}/><div style={{display:"flex",flexDirection:"column",gap:10}}>{levels.map(lvl=>{const code=`A${alm}-${zona}${mod}-N${lvl}`;const lvlItems=items.filter(i=>i.ubicacion===code);return(<div key={lvl} style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",boxShadow:C.shadow}}><div style={{padding:"11px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:lvlItems.length?`1px solid ${C.border}`:"none"}}><div><div style={{color:C.t1,fontSize:13,fontWeight:700}}>{typeof lvl==="number"?`Nivel ${lvl}`:lvl}</div><div style={{color:C.t3,fontSize:11,fontFamily:"monospace"}}>{code}</div></div>{lvlItems.length?<span style={{background:C.navyL,color:C.navy,fontSize:11,fontWeight:600,padding:"3px 8px",borderRadius:6}}>{lvlItems.length} artículo{lvlItems.length>1?"s":""}</span>:<span style={{color:C.t4,fontSize:11}}>Vacío</span>}</div>{lvlItems.map(it=>(<div key={it.id} onClick={()=>onItem(it)} style={{padding:"10px 14px",cursor:"pointer",borderTop:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:10}}><div style={{flex:1,minWidth:0,color:C.t1,fontSize:13,fontWeight:500,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{it.nombre}</div><Chip estado={it.estado} small/><ChevronRight size={13} color={C.t4}/></div>))}</div>);})}</div></div>);}
  if(zona&&alm){const mods=LOCS[alm]?.[zona]||{};return(<div style={{padding:"0 16px"}}><Breadcrumb parts={[`Almacén ${alm}`,`Zona ${zona}`]} onBack={()=>setZona(null)}/><div style={{display:"flex",flexDirection:"column",gap:6}}>{Object.entries(mods).map(([m,lvls])=>{const pre=`A${alm}-${zona}${m}`;const cnt=items.filter(i=>i.ubicacion&&i.ubicacion.startsWith(pre+"-")).length;const tp=locType(alm,zona,m);const TIcon=tp==="Armario"?Archive:tp==="Cajones"?Layers:Box;return(<div key={m} onClick={()=>setMod(m)} style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:12,padding:"12px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:12,boxShadow:C.shadow}}><div style={{width:38,height:38,borderRadius:10,background:C.navyL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><TIcon size={17} color={C.navy}/></div><div style={{flex:1}}><div style={{color:C.t1,fontSize:13,fontWeight:600}}>Módulo {m}</div><div style={{color:C.t3,fontSize:11,marginTop:2}}>{tp}</div></div>{cnt>0&&<span style={{background:C.navyL,color:C.navy,fontSize:12,fontWeight:600,padding:"3px 9px",borderRadius:6}}>{cnt}</span>}<ChevronRight size={15} color={C.t4}/></div>);})}</div></div>);}
  if(alm){const zones=LOCS[alm]||{};return(<div style={{padding:"0 16px"}}><Breadcrumb parts={[`Almacén ${alm}`]} onBack={()=>setAlm(null)}/><div style={{display:"flex",flexDirection:"column",gap:6}}>{Object.keys(zones).map(z=>{const cnt=items.filter(i=>i.ubicacion&&i.ubicacion.startsWith(`A${alm}-${z}`)).length;return(<div key={z} onClick={()=>setZona(z)} style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,boxShadow:C.shadow}}><div style={{width:44,height:44,borderRadius:12,background:C.navy,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:800,color:"#fff",flexShrink:0}}>{z}</div><div style={{flex:1}}><div style={{color:C.t1,fontSize:15,fontWeight:700}}>Zona {z}</div><div style={{color:C.t3,fontSize:12,marginTop:2}}>{Object.keys(zones[z]).length} módulos</div></div>{cnt>0&&<div style={{textAlign:"right"}}><div style={{color:C.navy,fontSize:18,fontWeight:800}}>{cnt}</div><div style={{color:C.t3,fontSize:10}}>artículos</div></div>}<ChevronRight size={15} color={C.t4}/></div>);})}</div></div>);}
  return(<div style={{padding:"0 16px"}}><Lbl>Selecciona un almacén</Lbl><div style={{display:"flex",flexDirection:"column",gap:10}}>{[1,2].map(a=>{const cnt=items.filter(i=>i.ubicacion&&i.ubicacion.startsWith(`A${a}-`)).length;const zCnt=Object.keys(LOCS[a]||{}).length;return(<div key={a} onClick={()=>setAlm(a)} style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden",cursor:"pointer",boxShadow:C.shadow}}><div style={{background:C.navy,padding:"16px 18px",display:"flex",alignItems:"center",gap:14}}><div style={{width:48,height:48,borderRadius:12,background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:900,color:"#fff",flexShrink:0}}>A{a}</div><div style={{flex:1}}><div style={{color:"#fff",fontSize:17,fontWeight:700}}>Almacén {a}</div><div style={{color:"rgba(255,255,255,0.6)",fontSize:12,marginTop:2}}>{zCnt} zonas</div></div><div style={{textAlign:"right"}}><div style={{color:"#fff",fontSize:24,fontWeight:800}}>{cnt}</div><div style={{color:"rgba(255,255,255,0.6)",fontSize:11}}>artículos</div></div></div><div style={{padding:"10px 18px",display:"flex",alignItems:"center",gap:4}}><span style={{color:C.t2,fontSize:12}}>Ver estructura</span><ChevronRight size={13} color={C.t3}/></div></div>);})}</div></div>);
}

function Herramientas({items,onItem}) {
  const h=items.filter(i=>i.tipo==="herramienta");
  const groups=[{label:"Fuera del almacén",c:C.red,items:h.filter(i=>["en_uso","prestado"].includes(i.estado))},{label:"Disponibles",c:C.green,items:h.filter(i=>i.estado==="disponible")},{label:"Requieren atención",c:C.red,items:h.filter(i=>["roto","reparacion","perdido","revisar"].includes(i.estado))},{label:"Otros",c:C.t2,items:h.filter(i=>["tirar","venta","reubicar"].includes(i.estado))}];
  return(<div style={{padding:"0 16px"}}>{groups.map(g=>g.items.length?(<div key={g.label} style={{marginBottom:20}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><div style={{width:3,height:14,borderRadius:2,background:g.c}}/><span style={{color:C.t3,fontSize:11,fontWeight:600,letterSpacing:"0.7px",textTransform:"uppercase"}}>{g.label}</span><span style={{background:g.c+"15",color:g.c,fontSize:10,fontWeight:700,padding:"1px 7px",borderRadius:6}}>{g.items.length}</span></div><div style={{display:"flex",flexDirection:"column",gap:6}}>{g.items.map(it=><ItemRow key={it.id} item={it} onClick={onItem}/>)}</div></div>):null)}</div>);
}

function Pendientes({items,onItem}) {
  const pend=items.filter(i=>["tirar","revisar","reubicar","venta","reparacion","roto"].includes(i.estado));
  const groups=[{e:"roto",label:"Roto",Icon:AlertTriangle},{e:"reparacion",label:"En reparación",Icon:RefreshCw},{e:"revisar",label:"Revisar",Icon:Info},{e:"reubicar",label:"Reubicar",Icon:MapPin},{e:"venta",label:"Posible venta",Icon:Star},{e:"tirar",label:"Para tirar",Icon:Trash2}];
  if(!pend.length)return<Empty text="Sin pendientes · Todo bajo control"/>;
  return(<div style={{padding:"0 16px"}}><div style={{color:C.t3,fontSize:11,marginBottom:14}}>{pend.length} artículo{pend.length!==1?"s":""} pendientes</div>{groups.map(g=>{const grp=pend.filter(i=>i.estado===g.e);if(!grp.length)return null;return(<div key={g.e} style={{marginBottom:20}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}><g.Icon size={12} color={C.t2}/><span style={{color:C.t3,fontSize:11,fontWeight:600,letterSpacing:"0.7px",textTransform:"uppercase"}}>{g.label}</span></div><div style={{display:"flex",flexDirection:"column",gap:6}}>{grp.map(it=><ItemRow key={it.id} item={it} onClick={onItem}/>)}</div></div>);})}</div>);
}

function RevisionGuiada({items,setItems,addMov,onItem}) {
  const locs=[];
  for(const [a,zones] of Object.entries(LOCS))for(const [z,mods] of Object.entries(zones))for(const [m,lvls] of Object.entries(mods))for(const lvl of lvls){const code=`A${a}-${z}${m}-N${lvl}`;const its=items.filter(i=>i.ubicacion===code);if(its.length>0)locs.push({code,alm:a,zona:z,mod:m,lvl,items:its});}
  locs.push({code:"sin_ubicacion",alm:"-",zona:"-",mod:"-",lvl:"-",items:items.filter(i=>!i.ubicacion)});
  const [idx,setIdx]=useState(0);const [confirmed,setConfirmed]=useState([]);const [notas,setNotas]=useState({});
  const loc=locs[idx];const pct=Math.round((confirmed.length/Math.max(locs.length,1))*100);
  const confirm=()=>{if(notas[loc.code])loc.items.forEach(it=>addMov({itemId:it.id,tipo:"edicion",quien:"Revisión",nota:`Revisión: ${notas[loc.code]}`,fecha:"Ahora"}));setConfirmed(p=>[...p,loc.code]);if(idx<locs.length-1)setIdx(i=>i+1);};
  if(!locs.length)return<Empty text="Sin artículos con ubicación"/>;
  if(confirmed.length===locs.length)return(<div style={{padding:"32px 16px",textAlign:"center"}}><div style={{fontSize:52,marginBottom:16}}>✅</div><div style={{color:C.green,fontSize:18,fontWeight:700,marginBottom:8}}>Revisión completada</div><div style={{color:C.t2,fontSize:13}}>{locs.length} ubicaciones revisadas</div></div>);
  return(
    <div style={{padding:"0 16px"}}>
      <div style={{background:C.s1,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px",marginBottom:14,boxShadow:C.shadow}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><div style={{color:C.t1,fontSize:13,fontWeight:700}}>Revisión guiada</div><div style={{color:C.navy,fontSize:13,fontWeight:700}}>{confirmed.length}/{locs.length}</div></div>
        <div style={{background:C.border,borderRadius:4,height:6,overflow:"hidden"}}><div style={{background:C.green,height:"100%",width:`${pct}%`,borderRadius:4,transition:"width 0.3s"}}/></div>
        <div style={{color:C.t3,fontSize:11,marginTop:6}}>{pct}% completado</div>
      </div>
      <div style={{background:C.navy,borderRadius:14,padding:"16px 18px",marginBottom:14,boxShadow:"0 4px 16px rgba(28,20,117,0.25)"}}><div style={{color:"rgba(255,255,255,0.6)",fontSize:11,marginBottom:4}}>Ubicación actual</div><div style={{color:"#fff",fontSize:22,fontWeight:900,fontFamily:"monospace",marginBottom:2}}>{loc.code}</div></div>
      <div style={{marginBottom:14}}><Lbl>Artículos en esta ubicación ({loc.items.length})</Lbl><div style={{display:"flex",flexDirection:"column",gap:6}}>{loc.items.map(it=><ItemRow key={it.id} item={it} onClick={onItem}/>)}</div></div>
      <div style={{marginBottom:14}}><Lbl>Nota (opcional)</Lbl><textarea value={notas[loc.code]||""} onChange={e=>setNotas(p=>({...p,[loc.code]:e.target.value}))} placeholder="Observaciones..." rows={2} style={{...IS,resize:"vertical"}}/></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:24}}>
        <button onClick={()=>idx>0&&setIdx(i=>i-1)} disabled={idx===0} style={{padding:12,borderRadius:10,border:`1px solid ${C.border}`,fontFamily:"inherit",background:idx===0?C.s2:C.s1,color:idx===0?C.t4:C.t2,fontSize:13,fontWeight:600,cursor:idx===0?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><ChevronLeft size={16}/>Anterior</button>
        <button onClick={confirm} style={{padding:12,borderRadius:10,border:"none",fontFamily:"inherit",background:C.green,color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6,boxShadow:"0 2px 10px rgba(79,168,0,0.3)"}}><CheckCircle size={16}/>Confirmar</button>
      </div>
    </div>
  );
}

function SearchModal({items,onClose,onItem}) {
  const [q,setQ]=useState("");
  const res=q.length>1?items.filter(i=>i.nombre.toLowerCase().includes(q.toLowerCase())||i.cat?.toLowerCase().includes(q.toLowerCase())||i.ubicacion?.toLowerCase().includes(q.toLowerCase())||i.id===q):[];
  return(
    <div style={{position:"absolute",inset:0,background:C.bg,zIndex:200,display:"flex",flexDirection:"column"}}>
      <div style={{background:C.s1,padding:"12px 14px",display:"flex",alignItems:"center",gap:10,borderBottom:`1px solid ${C.border}`,flexShrink:0}}>
        <Search size={16} color={C.navy}/>
        <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar artículo, categoría o ubicación..." style={{flex:1,background:"transparent",border:"none",outline:"none",color:C.t1,fontSize:15,fontFamily:"inherit"}}/>
        <VoiceBtn onResult={t=>setQ(t)}/>
        <button onClick={onClose} style={{background:C.s2,border:`1px solid ${C.border}`,borderRadius:8,cursor:"pointer",padding:"6px 10px",display:"flex",alignItems:"center",gap:4,color:C.t2,fontSize:12,fontWeight:600,fontFamily:"inherit"}}><X size={13}/>Cerrar</button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"14px 16px"}}>
        {q.length<2?<Empty text="Escribe para buscar..."/>:res.length===0?<Empty text={`Sin resultados para "${q}"`}/>:<div style={{display:"flex",flexDirection:"column",gap:6}}><div style={{color:C.t3,fontSize:11,marginBottom:4}}>{res.length} resultado{res.length!==1?"s":""}</div>{res.map(it=><ItemRow key={it.id} item={it} onClick={x=>{onItem(x);}}/>)}</div>}
      </div>
    </div>
  );
}

function AddModal({onClose,onAdd}) {
  const [f,setF]=useState({nombre:"",tipo:"herramienta",cat:"",estado:"disponible",ubicacion:"",notas:"",precio:"",stock:"",stockMin:"",proveedor:""});
  const set=(k,v)=>setF(p=>({...p,[k]:v}));const ok=f.nombre.trim().length>0;
  return(
    <div style={{position:"absolute",inset:0,background:C.bg,zIndex:300,display:"flex",flexDirection:"column"}}>
      <div style={{background:C.s1,padding:"14px 16px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${C.border}`}}><div style={{color:C.t1,fontSize:16,fontWeight:700}}>Nuevo artículo</div><button onClick={onClose} style={{background:C.s2,border:`1px solid ${C.border}`,borderRadius:8,cursor:"pointer",padding:6,display:"flex"}}><X size={16} color={C.t2}/></button></div>
      <div style={{flex:1,overflowY:"auto",padding:16}}>
        <FG label="Tipo"><div style={{display:"flex",gap:8}}>{[["herramienta","🔧 Herramienta"],["consumible","📦 Consumible"]].map(([v,l])=>(<button key={v} onClick={()=>set("tipo",v)} style={{flex:1,padding:10,borderRadius:8,fontFamily:"inherit",border:`1px solid ${f.tipo===v?C.navy:C.border}`,background:f.tipo===v?C.navyL:C.s2,color:f.tipo===v?C.navy:C.t2,fontSize:13,fontWeight:600,cursor:"pointer"}}>{l}</button>))}</div></FG>
        <FG label="Nombre *"><input value={f.nombre} onChange={e=>set("nombre",e.target.value)} placeholder="Nombre del artículo" style={IS}/></FG>
        <FG label="Categoría"><input value={f.cat} onChange={e=>set("cat",e.target.value)} placeholder="Ej: Fijación, Taladros..." style={IS}/></FG>
        <FG label="Ubicación"><select value={f.ubicacion} onChange={e=>set("ubicacion",e.target.value)} style={{...IS,cursor:"pointer"}}><option value="">— Sin ubicación —</option>{[1,2].map(a=>Object.entries(LOCS[a]||{}).map(([z,mods])=>Object.entries(mods).map(([m,lvls])=>lvls.map(lvl=>{const code=`A${a}-${z}${m}-N${lvl}`;return<option key={code} value={code}>{code}</option>;}))))}</select></FG>
        <FG label="Estado"><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{Object.entries(STATUS).slice(0,6).map(([k,cfg])=>(<button key={k} onClick={()=>set("estado",k)} style={{padding:"6px 12px",borderRadius:6,fontFamily:"inherit",border:`1px solid ${f.estado===k?cfg.c:C.border}`,background:f.estado===k?cfg.bg:C.s1,color:f.estado===k?cfg.c:C.t2,fontSize:12,fontWeight:600,cursor:"pointer"}}>{cfg.label}</button>))}</div></FG>
        {f.tipo==="consumible"&&(<><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}><FG label="Stock actual"><input value={f.stock} onChange={e=>set("stock",e.target.value)} type="number" placeholder="0" style={IS}/></FG><FG label="Stock mínimo"><input value={f.stockMin} onChange={e=>set("stockMin",e.target.value)} type="number" placeholder="0" style={IS}/></FG></div><FG label="Precio unitario (€)"><input value={f.precio} onChange={e=>set("precio",e.target.value)} type="number" step="0.01" placeholder="0.00" style={IS}/></FG></>)}
        <FG label="Proveedor"><input value={f.proveedor} onChange={e=>set("proveedor",e.target.value)} placeholder="Ej: Bricomart..." style={IS}/></FG>
        {f.tipo==="herramienta"&&(<FG label="Próxima revisión"><input type="date" value={f.proximaRevision||""} onChange={e=>set("proximaRevision",e.target.value||null)} style={IS}/></FG>)}
        <FG label="Notas"><textarea value={f.notas} onChange={e=>set("notas",e.target.value)} rows={3} style={{...IS,resize:"vertical"}}/></FG>
      </div>
      <div style={{padding:"12px 16px",borderTop:`1px solid ${C.border}`,flexShrink:0,background:C.s1}}><button onClick={()=>ok&&onAdd(f)} style={{width:"100%",padding:13,borderRadius:10,border:"none",fontFamily:"inherit",background:ok?C.navy:C.s2,color:ok?"#fff":C.t3,fontSize:14,fontWeight:700,cursor:ok?"pointer":"default"}}>{ok?"Guardar artículo":"Escribe un nombre"}</button></div>
    </div>
  );
}

function ImportModal({onClose,onImport}) {
  const [items,setItems]=useState([]); const [error,setError]=useState(""); const [loading,setLoading]=useState(false);
  const fileRef=useRef(null);
  const loadXLSX=async()=>{if(window.XLSX)return;await new Promise((res,rej)=>{const s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";s.onload=res;s.onerror=rej;document.head.appendChild(s);});};
  const handleFile=async e=>{const file=e.target.files?.[0];if(!file)return;setLoading(true);setError("");try{await loadXLSX();const ab=await file.arrayBuffer();const wb=window.XLSX.read(ab);const ws=wb.Sheets[wb.SheetNames[0]];const rows=window.XLSX.utils.sheet_to_json(ws);const parsed=rows.map((r,i)=>({id:"imp"+Date.now()+i,nombre:String(r["Nombre"]||r["nombre"]||"Sin nombre"),tipo:(String(r["Tipo"]||r["tipo"]||"consumible").toLowerCase().includes("herra"))?"herramienta":"consumible",cat:String(r["Categoría"]||r["cat"]||""),estado:"disponible",ubicacion:String(r["Ubicación"]||r["ubicacion"]||""),proveedor:String(r["Proveedor"]||r["proveedor"]||""),precio:parseFloat(r["Precio"]||0)||null,stock:parseInt(r["Stock"]||0)||0,stockMin:parseInt(r["StockMínimo"]||r["Stock mínimo"]||0)||0,notas:String(r["Notas"]||""),fotos:[],quien:null,desde:null,proximaRevision:null}));setItems(parsed);}catch(e){setError("Error leyendo el archivo.");}setLoading(false);};
  return(
    <div style={{position:"absolute",inset:0,background:C.bg,zIndex:300,display:"flex",flexDirection:"column"}}>
      <div style={{background:C.s1,padding:"14px 16px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${C.border}`}}><div style={{color:C.t1,fontSize:16,fontWeight:700}}>Importar desde Excel</div><button onClick={onClose} style={{background:C.s2,border:`1px solid ${C.border}`,borderRadius:8,cursor:"pointer",padding:6,display:"flex"}}><X size={16} color={C.t2}/></button></div>
      <div style={{flex:1,overflowY:"auto",padding:16}}>
        <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" style={{display:"none"}} onChange={handleFile}/>
        {!items.length&&<button onClick={()=>fileRef.current?.click()} style={{width:"100%",padding:"32px 16px",borderRadius:12,border:`2px dashed ${C.border}`,background:C.s2,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:10,fontFamily:"inherit"}}><Download size={28} color={C.t3}/><div style={{color:C.t2,fontSize:14,fontWeight:600}}>Seleccionar archivo</div><div style={{color:C.t3,fontSize:12}}>Excel (.xlsx) o CSV</div></button>}
        {loading&&<div style={{textAlign:"center",color:C.t3,padding:24,fontSize:13}}>Procesando...</div>}
        {error&&<div style={{color:C.red,background:C.redL,border:`1px solid ${C.redBorder}`,borderRadius:8,padding:"10px 12px",fontSize:12,marginTop:12}}>{error}</div>}
        {items.length>0&&<div style={{color:C.green,fontSize:13,fontWeight:600,marginBottom:12,display:"flex",alignItems:"center",gap:6}}><CheckCircle size={15} color={C.green}/>{items.length} artículos listos</div>}
      </div>
      {items.length>0&&<div style={{padding:"12px 16px",borderTop:`1px solid ${C.border}`,flexShrink:0,background:C.s1,display:"flex",gap:8}}><button onClick={()=>{setItems([]);}} style={{flex:1,padding:12,borderRadius:10,border:`1px solid ${C.border}`,fontFamily:"inherit",background:C.s2,color:C.t2,fontSize:13,fontWeight:600,cursor:"pointer"}}>Cancelar</button><button onClick={()=>onImport(items)} style={{flex:2,padding:12,borderRadius:10,border:"none",fontFamily:"inherit",background:C.navy,color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>Importar {items.length} artículos</button></div>}
    </div>
  );
}

function VoiceBtn({onResult}) {
  const [listening,setListening]=useState(false); const recRef=useRef(null);
  const toggle=()=>{const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR)return;if(listening){recRef.current?.stop();setListening(false);return;}const rec=new SR();rec.lang="es-ES";rec.continuous=false;rec.interimResults=false;rec.onresult=e=>{onResult(e.results[0][0].transcript);setListening(false);};rec.onerror=()=>setListening(false);rec.onend=()=>setListening(false);recRef.current=rec;rec.start();setListening(true);};
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR)return null;
  return(<button onClick={toggle} style={{background:listening?C.redL:C.navyL,border:`1px solid ${listening?C.redBorder:C.navyBorder}`,borderRadius:8,cursor:"pointer",padding:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={listening?C.red:C.navy} strokeWidth="2" strokeLinecap="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0014 0M12 19v3M8 22h8"/></svg></button>);
}

async function solicitarNotificacion(titulo,cuerpo) {
  if(!("Notification" in window))return;
  if(Notification.permission==="default")await Notification.requestPermission();
  if(Notification.permission==="granted")new Notification(`Aldago Almacén · ${titulo}`,{body:cuerpo,icon:"/icon.svg"});
}

// ═══════════════════════════════════════════════════════════
// ─── NUEVO: SELECTOR DE ROL ───────────────────────────────
// ═══════════════════════════════════════════════════════════
function RolSelector({onSelect}) {
  return (
    <div style={{position:"fixed",inset:0,background:"#1C1475",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,fontFamily:"'DM Sans',-apple-system,sans-serif"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 30% 20%, rgba(79,168,0,0.12) 0%, transparent 60%)",pointerEvents:"none"}}/>
      <div style={{position:"relative",zIndex:1,width:"100%",maxWidth:360}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:8}}><LogoAldago height={52}/></div>
        <div style={{textAlign:"center",color:"rgba(255,255,255,0.35)",fontSize:10,letterSpacing:"2px",fontWeight:700,textTransform:"uppercase",marginBottom:44}}>GESTIÓN DE ALMACÉN</div>
        <div style={{color:"#fff",fontSize:19,fontWeight:800,marginBottom:6,textAlign:"center",letterSpacing:"-0.4px"}}>¿Cómo accedes hoy?</div>
        <div style={{color:"rgba(255,255,255,0.45)",fontSize:13,marginBottom:28,textAlign:"center"}}>Selecciona tu perfil para continuar</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <button onClick={()=>onSelect("responsable")} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.18)",borderRadius:16,padding:"16px 18px",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:14,textAlign:"left"}}>
            <div style={{width:46,height:46,borderRadius:13,background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><ShieldCheck size={22} color="#fff"/></div>
            <div><div style={{color:"#fff",fontSize:15,fontWeight:700,marginBottom:2}}>Responsable almacén</div><div style={{color:"rgba(255,255,255,0.45)",fontSize:12}}>Marc · Carlos — acceso completo</div></div>
          </button>
          <button onClick={()=>onSelect("trabajador")} style={{background:"rgba(79,168,0,0.15)",border:"1px solid rgba(79,168,0,0.35)",borderRadius:16,padding:"16px 18px",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:14,textAlign:"left"}}>
            <div style={{width:46,height:46,borderRadius:13,background:"rgba(79,168,0,0.25)",border:"1px solid rgba(79,168,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><HardHat size={22} color="#4FA800"/></div>
            <div><div style={{color:"#fff",fontSize:15,fontWeight:700,marginBottom:2}}>Solicitar material</div><div style={{color:"rgba(255,255,255,0.45)",fontSize:12}}>Trabajadores — pedir herramientas o consumibles</div></div>
          </button>
          <button onClick={()=>onSelect("direccion")} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:16,padding:"16px 18px",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:14,textAlign:"left"}}>
            <div style={{width:46,height:46,borderRadius:13,background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><BarChart2 size={22} color="rgba(255,255,255,0.6)"/></div>
            <div><div style={{color:"rgba(255,255,255,0.65)",fontSize:15,fontWeight:700,marginBottom:2}}>Panel dirección</div><div style={{color:"rgba(255,255,255,0.35)",fontSize:12}}>Vista de gestión</div></div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ─── NUEVO: FORMULARIO SOLICITUD (trabajador) ─────────────
// ═══════════════════════════════════════════════════════════
function SolicitudForm({item,onClose,onEnviada}) {
  const [nombre,setNombre]=useState(""); const [numPedido,setNumPedido]=useState("");
  const [obra,setObra]=useState(""); const [cantidad,setCantidad]=useState(1); const [nota,setNota]=useState("");
  const isC=item.tipo==="consumible"; const ok=nombre.trim().length>0&&obra.trim().length>0;
  const IStw={background:"#F4F5FA",border:"1px solid #DDE1EE",borderRadius:8,padding:"10px 12px",color:"#0D1117",fontSize:13,fontFamily:"inherit",outline:"none",width:"100%",boxSizing:"border-box"};
  const FGtw=({label,children})=>(<div style={{marginBottom:14}}><div style={{color:"#374151",fontSize:12,fontWeight:600,marginBottom:6}}>{label}</div>{children}</div>);
  const enviar=()=>{if(!ok)return;onEnviada({id:"s"+Date.now(),itemId:item.id,itemNombre:item.nombre,itemTipo:item.tipo,nombre:nombre.trim(),numPedido:numPedido.trim(),obra:obra.trim(),cantidad:isC?cantidad:1,nota:nota.trim(),estado:"pendiente",fecha:fmtDate(),notaRespuesta:""});};
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div style={{background:"#fff",borderRadius:"20px 20px 0 0",width:"100%",maxWidth:430,maxHeight:"92vh",display:"flex",flexDirection:"column",boxShadow:"0 -8px 40px rgba(0,0,0,0.2)"}}>
        <div style={{padding:"16px 18px",borderBottom:"1px solid #DDE1EE",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div><div style={{color:"#0D1117",fontSize:16,fontWeight:700}}>Pedir material</div><div style={{color:"#6B7280",fontSize:12,marginTop:2,maxWidth:260,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.nombre}</div></div>
          <button onClick={onClose} style={{background:"#F4F5FA",border:"1px solid #DDE1EE",borderRadius:8,cursor:"pointer",padding:6,display:"flex"}}><X size={16} color="#374151"/></button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:18}}>
          <div style={{background:"#F4F5FA",border:"1px solid #DDE1EE",borderLeft:`3px solid ${item.tipo==="herramienta"?"#1C1475":"#4FA800"}`,borderRadius:10,padding:"12px 14px",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:34,height:34,borderRadius:9,background:item.tipo==="herramienta"?"rgba(28,20,117,0.08)":"rgba(79,168,0,0.1)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{item.tipo==="herramienta"?<Wrench size={15} color="#1C1475"/>:<Package size={15} color="#4FA800"/>}</div>
            <div style={{flex:1,minWidth:0}}><div style={{color:"#0D1117",fontSize:13,fontWeight:700,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{item.nombre}</div><div style={{color:"#6B7280",fontSize:11,marginTop:2}}>{item.tipo==="herramienta"?"Herramienta":`Consumible · ${item.stock} ud. disponibles`}</div></div>
          </div>
          <FGtw label="Tu nombre *"><input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Ej: Joan Puig" style={IStw}/></FGtw>
          <FGtw label="Nº de pedido / trabajo (opcional)"><input value={numPedido} onChange={e=>setNumPedido(e.target.value)} placeholder="Ej: 2025-0142" style={IStw}/></FGtw>
          <FGtw label="Obra / dirección *"><input value={obra} onChange={e=>setObra(e.target.value)} placeholder="Ej: Carrer Aragón 145, Barcelona" style={IStw}/></FGtw>
          {isC&&(<FGtw label="Cantidad"><div style={{display:"flex",alignItems:"center",gap:10}}><button onClick={()=>setCantidad(c=>Math.max(1,c-1))} style={{width:40,height:40,borderRadius:8,border:"1px solid #DDE1EE",background:"#F4F5FA",color:"#0D1117",fontSize:20,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>−</button><input value={cantidad} onChange={e=>setCantidad(Math.max(1,parseInt(e.target.value)||1))} style={{...IStw,textAlign:"center",fontSize:18,fontWeight:700,width:70}} type="number" min={1}/><button onClick={()=>setCantidad(c=>c+1)} style={{width:40,height:40,borderRadius:8,border:"1px solid #DDE1EE",background:"#F4F5FA",color:"#0D1117",fontSize:20,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>+</button></div></FGtw>)}
          <FGtw label="Nota (opcional)"><textarea value={nota} onChange={e=>setNota(e.target.value)} placeholder="Cualquier detalle adicional..." rows={2} style={{...IStw,resize:"vertical"}}/></FGtw>
        </div>
        <div style={{padding:"12px 18px",borderTop:"1px solid #DDE1EE",flexShrink:0}}>
          <button onClick={enviar} disabled={!ok} style={{width:"100%",padding:13,borderRadius:10,border:"none",fontFamily:"inherit",background:ok?"#4FA800":"#F4F5FA",color:ok?"#fff":"#9CA3AF",fontSize:14,fontWeight:700,cursor:ok?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><Send size={16}/>{ok?"Enviar solicitud":"Rellena nombre y obra"}</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ─── NUEVO: VISTA TRABAJADOR ──────────────────────────────
// ═══════════════════════════════════════════════════════════
function VistaTrabajador({items,sols,setSols,onSalir}) {
  const [q,setQ]=useState("");
  const [pedirItem,setPedirItem]=useState(null);
  const [confirmada,setConfirmada]=useState(null);
  const [verMisSols,setVerMisSols]=useState(false);
  const [nombreFiltro,setNombreFiltro]=useState("");
  const [nombreInput,setNombreInput]=useState("");

  const GV="#4FA800";
  const herrs=items.filter(i=>i.tipo==="herramienta"&&(!q||i.nombre.toLowerCase().includes(q.toLowerCase())));
  const cons=items.filter(i=>i.tipo==="consumible"&&i.stock>0&&(!q||i.nombre.toLowerCase().includes(q.toLowerCase())));

  const handleEnviada=sol=>{
    setSols(p=>[...p,sol]);
    setPedirItem(null);
    setConfirmada(sol);
    solicitarNotificacion("Nueva solicitud",`${sol.nombre} solicita: ${sol.itemNombre}`);
  };

  const statusColors={pendiente:"#B45309",aceptada:"#1C1475",entregada:"#4FA800",rechazada:"#C0392B"};
  const statusLabels={pendiente:"Pendiente",aceptada:"Aceptada",entregada:"Entregada",rechazada:"Rechazada"};

  // MIS SOLICITUDES
  if(verMisSols) {
    const misSolsList=sols.filter(s=>nombreFiltro&&s.nombre.toLowerCase()===nombreFiltro.toLowerCase());
    return(
      <div style={{position:"fixed",inset:0,background:"#ECEEF5",display:"flex",flexDirection:"column",fontFamily:"'DM Sans',sans-serif"}}>
        <div style={{background:GV,padding:"0 16px",height:58,display:"flex",alignItems:"center",gap:12,flexShrink:0,boxShadow:"0 2px 12px rgba(79,168,0,0.25)"}}>
          <button onClick={()=>setVerMisSols(false)} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:8,cursor:"pointer",padding:"7px 12px",color:"#fff",fontSize:13,fontWeight:600,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5}}><ChevronLeft size={14} color="#fff"/>Volver</button>
          <div style={{flex:1,color:"#fff",fontSize:16,fontWeight:700}}>Mis solicitudes</div>
          <button onClick={onSalir} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:8,cursor:"pointer",padding:8,display:"flex"}}><LogOut size={16} color="rgba(255,255,255,0.8)"/></button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:16}}>
          <div style={{background:"#fff",border:"1px solid #DDE1EE",borderRadius:10,padding:"12px 14px",marginBottom:14}}>
            <div style={{color:"#6B7280",fontSize:12,fontWeight:600,marginBottom:8}}>¿Cuál es tu nombre?</div>
            <div style={{display:"flex",gap:8}}>
              <input value={nombreInput} onChange={e=>setNombreInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&setNombreFiltro(nombreInput)} placeholder="Tu nombre" style={{background:"#F4F5FA",border:"1px solid #DDE1EE",borderRadius:8,padding:"10px 12px",color:"#0D1117",fontSize:13,fontFamily:"inherit",outline:"none",flex:1,boxSizing:"border-box"}}/>
              <button onClick={()=>setNombreFiltro(nombreInput)} style={{padding:"10px 14px",borderRadius:8,border:"none",background:GV,color:"#fff",fontFamily:"inherit",fontSize:13,fontWeight:600,cursor:"pointer"}}>Ver</button>
            </div>
          </div>
          {nombreFiltro&&(misSolsList.length===0?<div style={{textAlign:"center",color:"#9CA3AF",padding:"48px 20px",fontSize:13}}>No hay solicitudes para "{nombreFiltro}"</div>:
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {[...misSolsList].reverse().map(s=>(
                <div key={s.id} style={{background:"#fff",border:"1px solid #DDE1EE",borderLeft:`3px solid ${statusColors[s.estado]}`,borderRadius:12,padding:"14px 16px"}}>
                  <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:8}}>
                    <div style={{color:"#0D1117",fontSize:13,fontWeight:700,flex:1,marginRight:10}}>{s.itemNombre}</div>
                    <span style={{background:statusColors[s.estado]+"15",color:statusColors[s.estado],fontSize:11,fontWeight:700,padding:"3px 9px",borderRadius:6,whiteSpace:"nowrap"}}>{statusLabels[s.estado]}</span>
                  </div>
                  <div style={{color:"#6B7280",fontSize:11,marginBottom:s.notaRespuesta?8:0}}>📍 {s.obra}{s.numPedido?` · Pedido ${s.numPedido}`:""} · {s.fecha}</div>
                  {s.notaRespuesta&&<div style={{background:statusColors[s.estado]+"10",border:`1px solid ${statusColors[s.estado]}25`,borderRadius:8,padding:"8px 10px",marginTop:8}}><div style={{color:"#9CA3AF",fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:3}}>Nota del responsable</div><div style={{color:"#0D1117",fontSize:12}}>{s.notaRespuesta}</div></div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // CONFIRMACIÓN
  if(confirmada) {
    return(
      <div style={{position:"fixed",inset:0,background:"#fff",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,fontFamily:"'DM Sans',sans-serif"}}>
        <div style={{width:72,height:72,borderRadius:20,background:"rgba(79,168,0,0.12)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20}}><CheckCircle size={36} color={GV}/></div>
        <div style={{color:"#0D1117",fontSize:22,fontWeight:800,marginBottom:8,textAlign:"center"}}>¡Solicitud enviada!</div>
        <div style={{color:"#6B7280",fontSize:14,textAlign:"center",marginBottom:8}}>{confirmada.itemNombre}</div>
        <div style={{color:"#9CA3AF",fontSize:12,textAlign:"center",marginBottom:32}}>El responsable revisará tu solicitud y te la preparará.</div>
        <div style={{display:"flex",flexDirection:"column",gap:10,width:"100%",maxWidth:300}}>
          <button onClick={()=>{setNombreFiltro(confirmada.nombre);setNombreInput(confirmada.nombre);setConfirmada(null);setVerMisSols(true);}} style={{padding:13,borderRadius:10,border:"none",background:GV,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Ver mis solicitudes</button>
          <button onClick={()=>setConfirmada(null)} style={{padding:13,borderRadius:10,border:"1px solid #DDE1EE",background:"#F4F5FA",color:"#374151",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Pedir otro material</button>
        </div>
      </div>
    );
  }

  // VISTA PRINCIPAL
  return(
    <div style={{position:"fixed",inset:0,background:"#ECEEF5",display:"flex",flexDirection:"column",fontFamily:"'DM Sans',sans-serif"}}>
      <div style={{background:GV,padding:"0 16px",height:58,display:"flex",alignItems:"center",gap:12,flexShrink:0,boxShadow:"0 2px 12px rgba(79,168,0,0.25)"}}>
        <div style={{flex:1,display:"flex",alignItems:"center",gap:10}}><LogoAldago height={34}/><div style={{width:1,height:18,background:"rgba(255,255,255,0.25)"}}/><div style={{color:"rgba(255,255,255,0.8)",fontSize:12,fontWeight:600}}>Solicitar material</div></div>
        <button onClick={()=>{setNombreFiltro("");setVerMisSols(true);}} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:8,cursor:"pointer",padding:"7px 12px",color:"#fff",fontSize:12,fontWeight:600,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5}}><Inbox size={14} color="#fff"/>Mis solicitudes</button>
        <button onClick={onSalir} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:8,cursor:"pointer",padding:8,display:"flex"}}><LogOut size={16} color="rgba(255,255,255,0.8)"/></button>
      </div>
      <div style={{padding:"12px 16px 0",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:8,background:"#fff",border:"1px solid #DDE1EE",borderRadius:10,padding:"9px 12px"}}><Search size={15} color="#9CA3AF"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar material..." style={{flex:1,background:"transparent",border:"none",outline:"none",color:"#0D1117",fontSize:13,fontFamily:"inherit"}}/>{q&&<button onClick={()=>setQ("")} style={{background:"none",border:"none",cursor:"pointer",padding:0,display:"flex"}}><X size={13} color="#9CA3AF"/></button>}</div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:16}}>
        {herrs.length>0&&(
          <div style={{marginBottom:20}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><Wrench size={14} color="#1C1475"/><span style={{color:"#1C1475",fontSize:11,fontWeight:700,letterSpacing:"0.8px",textTransform:"uppercase"}}>Herramientas</span><span style={{background:"rgba(28,20,117,0.08)",color:"#1C1475",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:10}}>{herrs.length}</span></div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {herrs.map(it=>{const disp=it.estado==="disponible";return(
                <div key={it.id} style={{background:"#fff",border:"1px solid #DDE1EE",borderRadius:10,padding:"12px 14px",display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:36,height:36,borderRadius:9,background:disp?"rgba(28,20,117,0.07)":"#F4F5FA",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Wrench size={15} color={disp?"#1C1475":"#9CA3AF"}/></div>
                  <div style={{flex:1,minWidth:0}}><div style={{color:disp?"#0D1117":"#9CA3AF",fontSize:13,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{it.nombre}</div>{it.cat&&<div style={{color:"#9CA3AF",fontSize:11,marginTop:2}}>{it.cat}</div>}</div>
                  {disp?<button onClick={()=>setPedirItem(it)} style={{background:"#1C1475",border:"none",borderRadius:8,cursor:"pointer",padding:"8px 14px",color:"#fff",fontSize:12,fontWeight:700,fontFamily:"inherit",whiteSpace:"nowrap"}}>Pedir</button>:<span style={{background:"#F4F5FA",border:"1px solid #DDE1EE",borderRadius:8,padding:"8px 10px",color:"#9CA3AF",fontSize:11,fontWeight:600,whiteSpace:"nowrap"}}>No disp.</span>}
                </div>
              );})}
            </div>
          </div>
        )}
        {cons.length>0&&(
          <div style={{marginBottom:20}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><Package size={14} color={GV}/><span style={{color:GV,fontSize:11,fontWeight:700,letterSpacing:"0.8px",textTransform:"uppercase"}}>Consumibles disponibles</span><span style={{background:"rgba(79,168,0,0.08)",color:GV,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:10}}>{cons.length}</span></div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {cons.map(it=>(<div key={it.id} style={{background:"#fff",border:"1px solid #DDE1EE",borderRadius:10,padding:"12px 14px",display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:36,height:36,borderRadius:9,background:"rgba(79,168,0,0.08)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Package size={15} color={GV}/></div>
                <div style={{flex:1,minWidth:0}}><div style={{color:"#0D1117",fontSize:13,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{it.nombre}</div>{it.cat&&<div style={{color:"#9CA3AF",fontSize:11,marginTop:2}}>{it.cat} · {it.stock} ud.</div>}</div>
                <button onClick={()=>setPedirItem(it)} style={{background:GV,border:"none",borderRadius:8,cursor:"pointer",padding:"8px 14px",color:"#fff",fontSize:12,fontWeight:700,fontFamily:"inherit",whiteSpace:"nowrap"}}>Pedir</button>
              </div>))}
            </div>
          </div>
        )}
        {herrs.length===0&&cons.length===0&&<div style={{textAlign:"center",color:"#9CA3AF",padding:"56px 20px",fontSize:13}}>{q?`Sin resultados para "${q}"`:"No hay material disponible"}</div>}
      </div>
      {pedirItem&&<SolicitudForm item={pedirItem} onClose={()=>setPedirItem(null)} onEnviada={handleEnviada}/>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ─── NUEVO: BANDEJA DE SOLICITUDES (responsable) ──────────
// ═══════════════════════════════════════════════════════════
function BandejaSolicitudes({sols,setSols,items,setItems,addMov}) {
  const [tab,setTab]=useState("pendiente");
  const [rechazoModal,setRechazoModal]=useState(null);
  const [rechazoNota,setRechazoNota]=useState("");

  const tabs=[{id:"pendiente",label:"Pendientes"},{id:"aceptada",label:"Aceptadas"},{id:"entregada",label:"Entregadas"},{id:"rechazada",label:"Rechazadas"}];
  const filtered=sols.filter(s=>s.estado===tab);
  const pendCount=sols.filter(s=>s.estado==="pendiente").length;
  const statusColors={pendiente:C.amber,aceptada:C.navy,entregada:C.green,rechazada:C.red};
  const statusLabels={pendiente:"Pendiente",aceptada:"Aceptada",entregada:"Entregada",rechazada:"Rechazada"};

  const aceptar=id=>setSols(p=>p.map(s=>s.id===id?{...s,estado:"aceptada"}:s));
  const rechazar=(sol,nota)=>{setSols(p=>p.map(s=>s.id===sol.id?{...s,estado:"rechazada",notaRespuesta:nota}:s));setRechazoModal(null);setRechazoNota("");};
  const entregar=sol=>{
    setSols(p=>p.map(s=>s.id===sol.id?{...s,estado:"entregada"}:s));
    const it=items.find(i=>i.id===sol.itemId);
    if(!it)return;
    const fecha=fmtDate();
    if(sol.itemTipo==="consumible"){
      const notaEntrega=`Última entrega: ${sol.nombre}${sol.numPedido?` · Pedido ${sol.numPedido}`:""} · ${sol.obra} · ${fecha}`;
      setItems(p=>p.map(i=>i.id===sol.itemId?{...i,stock:Math.max(0,(i.stock||0)-sol.cantidad),notas:notaEntrega}:i));
      addMov({itemId:sol.itemId,tipo:"uso",quien:sol.nombre,nota:`${sol.cantidad} ud. · ${sol.obra}${sol.numPedido?` · Pedido ${sol.numPedido}`:""}`,fecha,cantidad:sol.cantidad});
    } else {
      setItems(p=>p.map(i=>i.id===sol.itemId?{...i,estado:"en_uso",quien:sol.nombre,desde:fecha,notas:`${sol.numPedido?`Pedido ${sol.numPedido} · `:""}${sol.obra}`}:i));
      addMov({itemId:sol.itemId,tipo:"salida",quien:sol.nombre,nota:`Solicitud · ${sol.obra}${sol.numPedido?` · Pedido ${sol.numPedido}`:""}`,fecha});
    }
  };

  return(
    <div style={{padding:"0 16px"}}>
      <div style={{display:"flex",gap:6,marginBottom:14,overflowX:"auto",paddingBottom:2}}>
        {tabs.map(t=>{const cnt=sols.filter(s=>s.estado===t.id).length;const active=tab===t.id;return(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"7px 14px",borderRadius:20,border:`1px solid ${active?C.navy:C.border}`,background:active?C.navy:C.s1,color:active?"#fff":C.t2,fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",display:"flex",alignItems:"center",gap:6}}>
            {t.label}
            {cnt>0&&<span style={{background:active?"rgba(255,255,255,0.25)":(t.id==="pendiente"?C.red+"20":C.navy+"20"),color:active?"#fff":(t.id==="pendiente"?C.red:C.navy),fontSize:10,fontWeight:700,padding:"1px 6px",borderRadius:10}}>{cnt}</span>}
          </button>
        );})}
      </div>
      {filtered.length===0?<Empty text={`Sin solicitudes ${tabs.find(t=>t.id===tab)?.label.toLowerCase()}`}/>:
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {[...filtered].reverse().map(sol=>{const sc=statusColors[sol.estado];return(
            <div key={sol.id} style={{background:C.s1,border:`1px solid ${C.border}`,borderLeft:`3px solid ${sc}`,borderRadius:12,padding:"14px 16px",boxShadow:C.shadow}}>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:10}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{color:C.t1,fontSize:14,fontWeight:700,marginBottom:6}}>{sol.itemNombre}</div>
                  <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                    <span style={{background:C.navyL,color:C.navy,fontSize:11,fontWeight:600,padding:"2px 8px",borderRadius:6,display:"flex",alignItems:"center",gap:4}}><User size={10} color={C.navy}/>{sol.nombre}</span>
                    {sol.numPedido&&<span style={{background:"#EBF4FF",color:"#1E40AF",fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:6,fontFamily:"'DM Mono',monospace"}}>#{sol.numPedido}</span>}
                    {sol.cantidad>1&&<span style={{background:C.greenL,color:C.green,fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:6}}>×{sol.cantidad}</span>}
                  </div>
                </div>
                <span style={{background:sc+"15",color:sc,fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:6,flexShrink:0,marginLeft:8,whiteSpace:"nowrap"}}>{statusLabels[sol.estado]}</span>
              </div>
              <div style={{color:C.t3,fontSize:12,marginBottom:sol.nota||sol.notaRespuesta?10:0}}>📍 {sol.obra} · {sol.fecha}</div>
              {sol.nota&&<div style={{background:C.s2,borderRadius:8,padding:"8px 10px",marginBottom:8}}><div style={{color:C.t4,fontSize:10,fontWeight:600,marginBottom:2}}>NOTA DEL TRABAJADOR</div><div style={{color:C.t2,fontSize:12}}>{sol.nota}</div></div>}
              {sol.notaRespuesta&&<div style={{background:sc+"10",border:`1px solid ${sc}25`,borderRadius:8,padding:"8px 10px",marginBottom:8}}><div style={{color:C.t4,fontSize:10,fontWeight:600,marginBottom:2}}>NOTA DE RESPUESTA</div><div style={{color:C.t2,fontSize:12}}>{sol.notaRespuesta}</div></div>}
              {sol.estado==="pendiente"&&<div style={{display:"flex",gap:8,marginTop:4}}>
                <button onClick={()=>aceptar(sol.id)} style={{flex:1,padding:"9px 0",borderRadius:9,border:"none",background:C.green,color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><ThumbsUp size={13}/>Aceptar</button>
                <button onClick={()=>{setRechazoModal(sol);setRechazoNota("");}} style={{flex:1,padding:"9px 0",borderRadius:9,border:"none",background:C.redL,color:C.red,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><ThumbsDown size={13}/>Rechazar</button>
              </div>}
              {sol.estado==="aceptada"&&<button onClick={()=>entregar(sol)} style={{width:"100%",padding:"10px 0",borderRadius:9,border:"none",background:C.navy,color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:5,marginTop:4}}><PackageCheck size={14}/>Marcar como entregado</button>}
            </div>
          );})}
        </div>
      }
      {rechazoModal&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
          <div style={{background:C.s1,borderRadius:18,padding:24,maxWidth:360,width:"100%",boxShadow:"0 8px 40px rgba(0,0,0,0.2)"}}>
            <div style={{color:C.t1,fontSize:16,fontWeight:700,marginBottom:6}}>Rechazar solicitud</div>
            <div style={{color:C.t3,fontSize:13,marginBottom:14}}>{rechazoModal.itemNombre} · {rechazoModal.nombre}</div>
            <div style={{color:C.t2,fontSize:12,fontWeight:600,marginBottom:8}}>Motivo (opcional)</div>
            <textarea value={rechazoNota} onChange={e=>setRechazoNota(e.target.value)} placeholder="¿Por qué se rechaza?" rows={3} style={{...IS,resize:"vertical",marginBottom:16}}/>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setRechazoModal(null)} style={{flex:1,padding:12,borderRadius:10,border:`1px solid ${C.border}`,background:C.s2,color:C.t2,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Cancelar</button>
              <button onClick={()=>rechazar(rechazoModal,rechazoNota)} style={{flex:1,padding:12,borderRadius:10,border:"none",background:C.red,color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Rechazar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── LAYOUT ───────────────────────────────────────────────
function useLayout() {
  const get=()=>({w:window.innerWidth,h:window.innerHeight,isMobile:window.innerWidth<768,isTablet:window.innerWidth>=768&&window.innerWidth<1200,isDesktop:window.innerWidth>=1200,isLandscape:window.innerWidth>window.innerHeight});
  const [L,setL]=useState(get);
  useEffect(()=>{const h=()=>setL(get());window.addEventListener("resize",h);window.addEventListener("orientationchange",h);return()=>{window.removeEventListener("resize",h);window.removeEventListener("orientationchange",h);};},[]);
  return L;
}

function Sidebar({view,setView,collapsed,pendingCount=0}) {
  const tabs=[
    {id:"dashboard",   Icon:Home,    label:"Inicio",      badge:0},
    {id:"inventario",  Icon:Package, label:"Inventario",  badge:0},
    {id:"ubicaciones", Icon:MapPin,  label:"Ubicaciones", badge:0},
    {id:"herramientas",Icon:Wrench,  label:"Herramientas",badge:0},
    {id:"pendientes",  Icon:List,    label:"Pendientes",  badge:0},
    {id:"solicitudes", Icon:Inbox,   label:"Solicitudes", badge:pendingCount},
    {id:"historial",   Icon:History, label:"Historial",   badge:0},
  ];
  return(
    <div style={{background:C.navy,width:collapsed?60:220,flexShrink:0,display:"flex",flexDirection:"column",transition:"width 0.2s ease",overflow:"hidden",boxShadow:"2px 0 12px rgba(13,17,23,0.2)"}}>
      <div style={{padding:collapsed?"16px 0":"20px 20px 16px",display:"flex",alignItems:"center",justifyContent:collapsed?"center":"flex-start",borderBottom:"1px solid rgba(255,255,255,0.08)",minHeight:60}}>
        {collapsed?<LogoSymbol size={30}/>:<LogoAldago height={36}/>}
      </div>
      {!collapsed&&<div style={{padding:"4px 20px 12px",color:"rgba(255,255,255,0.35)",fontSize:9,letterSpacing:"1.2px",fontWeight:700,textTransform:"uppercase"}}>ALMACÉN</div>}
      <div style={{flex:1,padding:"8px 8px",display:"flex",flexDirection:"column",gap:2}}>
        {tabs.map(({id,Icon,label,badge})=>{const a=view===id;return(
          <button key={id} onClick={()=>setView(id)} style={{background:a?"rgba(255,255,255,0.12)":"transparent",border:"none",borderRadius:8,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:collapsed?0:10,padding:collapsed?"10px":"10px 12px",justifyContent:collapsed?"center":"flex-start",position:"relative"}}>
            <Icon size={18} color={a?"#fff":"rgba(255,255,255,0.45)"} strokeWidth={a?2.2:1.5}/>
            {!collapsed&&<span style={{fontSize:13,fontWeight:a?600:400,color:a?"#fff":"rgba(255,255,255,0.5)",whiteSpace:"nowrap",flex:1}}>{label}</span>}
            {badge>0&&<span style={{background:C.red,color:"#fff",fontSize:9,fontWeight:700,minWidth:16,height:16,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",padding:"0 2px",position:collapsed?"absolute":"relative",top:collapsed?6:undefined,right:collapsed?6:undefined}}>{badge}</span>}
          </button>
        );})}
      </div>
      {!collapsed&&<div style={{padding:"12px 20px",borderTop:"1px solid rgba(255,255,255,0.08)"}}><div style={{color:"rgba(255,255,255,0.25)",fontSize:10}}>serveis i instal·lacions</div></div>}
    </div>
  );
}

function AppNav({view,setView,pendingCount=0}) {
  const tabs=[
    {id:"dashboard",   Icon:Home,    label:"Inicio"},
    {id:"inventario",  Icon:Package, label:"Inventario"},
    {id:"herramientas",Icon:Wrench,  label:"Herramientas"},
    {id:"solicitudes", Icon:Inbox,   label:"Solicitudes",badge:pendingCount},
    {id:"pendientes",  Icon:List,    label:"Pendientes"},
    {id:"historial",   Icon:History, label:"Historial"},
  ];
  return(
    <div style={{background:C.s1,borderTop:`1px solid ${C.border}`,display:"flex",padding:"5px 2px 4px",flexShrink:0,boxShadow:"0 -2px 8px rgba(28,20,117,0.05)"}}>
      {tabs.map(({id,Icon,label,badge})=>{const a=view===id;return(
        <button key={id} onClick={()=>setView(id)} style={{flex:1,background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"3px 1px",position:"relative"}}>
          <div style={{width:36,height:28,borderRadius:8,background:a?C.navyL:"transparent",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
            <Icon size={19} color={a?C.navy:C.t4} strokeWidth={a?2.2:1.5}/>
            {badge>0&&<span style={{position:"absolute",top:-3,right:-3,background:C.red,color:"#fff",fontSize:8,fontWeight:700,minWidth:14,height:14,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",padding:"0 2px"}}>{badge}</span>}
          </div>
          <span style={{fontSize:9,fontWeight:a?700:400,color:a?C.navy:C.t4,lineHeight:1}}>{label}</span>
        </button>
      );})}
    </div>
  );
}

// ─── ROOT ────────────────────────────────────────────────
export default function AldagoApp() {
  // ── TODOS LOS HOOKS PRIMERO ─────────────────────────────
  const [view,    setView]   =useState("dashboard");
  const [selItem, setSelItem]=useState(null);
  const [editItem,setEditItem]=useState(null);
  const [items,   setItems]  =useState(ITEMS0);
  const [movs,    setMovs]   =useState(MOVS0);
  const [search,  setSearch] =useState(false);
  const [adding,  setAdding] =useState(false);
  const [scanning,setScanning]=useState(false);
  const [dark,    setDark]   =useState(false);
  const [rol,     setRol]    =useState(null);
  const [sols,    setSols]   =useState(SOLS0);
  const L=useLayout();

  C=mkColors(dark);

  useEffect(()=>{
    const l=document.createElement("link");
    l.href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap";
    l.rel="stylesheet"; document.head.appendChild(l);
    const s=document.createElement("style");
    s.textContent=`*{-webkit-tap-highlight-color:transparent;box-sizing:border-box;}input,textarea,select,button{font-family:'DM Sans',sans-serif;}::-webkit-scrollbar{width:4px;height:4px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:rgba(28,20,117,0.15);border-radius:4px;}`;
    document.head.appendChild(s);
    return()=>{try{document.head.removeChild(l);document.head.removeChild(s)}catch(e){}};
  },[]);

  // ── HELPERS (sin hooks) ─────────────────────────────────
  const toggleDark=()=>{C=mkColors(!dark);setDark(d=>!d);};
  const goTo=v=>{setView(v);setSelItem(null);setEditItem(null);};
  const addMov=m=>setMovs(p=>[...p,{...m,id:"mv"+Date.now()+Math.random()}]);
  const addItem=f=>{const newItem={...f,id:"n"+Date.now(),precio:f.precio?parseFloat(f.precio):null,stock:f.stock!==""?parseInt(f.stock):null,stockMin:f.stockMin!==""?parseInt(f.stockMin):null,quien:null,desde:null,fotos:[]};setItems(p=>[...p,newItem]);addMov({itemId:newItem.id,tipo:"edicion",quien:"Responsable",nota:"Artículo creado",fecha:fmtDate()});setAdding(false);};
  const saveEdit=f=>{setItems(p=>p.map(i=>i.id===f.id?{...f,precio:f.precio!==""?parseFloat(f.precio):null,stock:f.stock!==""?parseInt(f.stock):null,stockMin:f.stockMin!==""?parseInt(f.stockMin):null}:i));addMov({itemId:f.id,tipo:"edicion",quien:"Responsable",nota:"Artículo editado",fecha:fmtDate()});setEditItem(null);setSelItem(f);};
  const openItem=it=>{setSelItem(it);setSearch(false);setScanning(false);};
  const anyModal=search||adding||scanning||(editItem!=null);
  const useSidebar=!L.isMobile||L.isLandscape;
  const sidebarCollapsed=L.isLandscape&&L.isMobile;
  const pendingCount=sols.filter(s=>s.estado==="pendiente").length;

  // ── RETURNS CONDICIONALES AL FINAL (después de todos los hooks) ──
  if(!rol) return <RolSelector onSelect={setRol}/>;
  if(rol==="trabajador") return <VistaTrabajador items={items} sols={sols} setSols={setSols} onSalir={()=>setRol(null)}/>;

  // ── RENDER PRINCIPAL (responsable / dirección) ──────────
  const DarkBtn=({invert})=>(<button onClick={toggleDark} style={{background:invert?"rgba(255,255,255,0.1)":C.s2,border:`1px solid ${invert?"rgba(255,255,255,0.14)":C.border}`,borderRadius:8,cursor:"pointer",padding:8,display:"flex",alignItems:"center",justifyContent:"center"}}>{dark?<Sun size={16} color={invert?"rgba(255,255,255,0.8)":C.t2}/>:<Moon size={16} color={invert?"rgba(255,255,255,0.8)":C.t2}/>}</button>);

  const titles={inventario:"Inventario",herramientas:"Herramientas",ubicaciones:"Ubicaciones",pendientes:"Pendientes",revision:"Revisión guiada",historial:"Historial",solicitudes:"Solicitudes"};

  const ContentArea=(
    <div style={{flex:1,overflowY:"auto",paddingTop:useSidebar?0:10,position:"relative",WebkitOverflowScrolling:"touch",background:C.bg}}>
      {selItem?<ItemDetail item={selItem} items={items} setItems={setItems} setSelItem={setSelItem} movs={movs} addMov={addMov} onEdit={()=>setEditItem(selItem)}/>
        :view==="dashboard"?<Dashboard items={items} movs={movs} onItem={openItem} goTo={goTo}/>
        :view==="inventario"?<Inventario items={items} onItem={openItem} setItems={setItems}/>
        :view==="ubicaciones"?<Ubicaciones items={items} onItem={openItem}/>
        :view==="herramientas"?<Herramientas items={items} onItem={openItem}/>
        :view==="pendientes"?<Pendientes items={items} onItem={openItem}/>
        :view==="historial"?<HistorialGlobal movs={movs} items={items}/>
        :view==="revision"?<RevisionGuiada items={items} setItems={setItems} addMov={addMov} onItem={openItem}/>
        :view==="solicitudes"?<BandejaSolicitudes sols={sols} setSols={setSols} items={items} setItems={setItems} addMov={addMov}/>
        :null
      }
      {search&&<SearchModal items={items} onClose={()=>setSearch(false)} onItem={openItem}/>}
      {adding&&<AddModal onClose={()=>setAdding(false)} onAdd={addItem}/>}
      {scanning&&<QRScanner items={items} onClose={()=>setScanning(false)} onItem={openItem}/>}
      {editItem&&<EditModal item={editItem} onClose={()=>setEditItem(null)} onSave={saveEdit}/>}
    </div>
  );

  if(useSidebar) {
    return(
      <div style={{fontFamily:"'DM Sans',-apple-system,sans-serif",background:C.bg,color:C.t1,display:"flex",height:"100dvh",overflow:"hidden",position:"fixed",inset:0}}>
        <Sidebar view={selItem?null:view} setView={goTo} collapsed={sidebarCollapsed} pendingCount={pendingCount}/>
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minWidth:0}}>
          <div style={{background:C.navy,padding:"0 20px",display:"flex",alignItems:"center",gap:12,height:58,flexShrink:0,boxShadow:"0 2px 12px rgba(13,17,23,0.2)"}}>
            {selItem&&<button onClick={()=>setSelItem(null)} style={{background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.15)",color:"#fff",cursor:"pointer",padding:"7px 12px",borderRadius:8,display:"flex",alignItems:"center",gap:5,fontSize:13,fontWeight:600,fontFamily:"inherit",flexShrink:0}}><ChevronLeft size={14} color="#fff"/>Volver</button>}
            <div style={{flex:1,display:"flex",alignItems:"center",gap:10}}>
              {view==="dashboard"&&!selItem?<LogoAldago height={36}/>:<div style={{color:"#fff",fontSize:15,fontWeight:600}}>{selItem?selItem.nombre:titles[view]||"Panel"}</div>}
              {view==="solicitudes"&&!selItem&&pendingCount>0&&<span style={{background:C.red,color:"#fff",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:10}}>{pendingCount} pendiente{pendingCount>1?"s":""}</span>}
            </div>
            <div style={{display:"flex",gap:6}}>
              <DarkBtn invert/>
              <button onClick={()=>setScanning(true)} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.14)",borderRadius:8,cursor:"pointer",padding:8,display:"flex"}}><QrCode size={16} color="rgba(255,255,255,0.8)"/></button>
              <button onClick={()=>setSearch(true)} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.14)",borderRadius:8,cursor:"pointer",padding:8,display:"flex"}}><Search size={16} color="rgba(255,255,255,0.8)"/></button>
              <button onClick={()=>setRol(null)} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.14)",borderRadius:8,cursor:"pointer",padding:8,display:"flex"}} title="Cambiar rol"><LogOut size={16} color="rgba(255,255,255,0.8)"/></button>
              {!anyModal&&!selItem&&<button onClick={()=>setAdding(true)} style={{background:C.green,border:"none",borderRadius:8,cursor:"pointer",padding:"8px 14px",display:"flex",alignItems:"center",gap:6,boxShadow:"0 2px 8px rgba(79,168,0,0.3)"}}><Plus size={16} color="#fff" strokeWidth={2.5}/><span style={{color:"#fff",fontSize:13,fontWeight:600}}>Nuevo</span></button>}
            </div>
          </div>
          <div style={{flex:1,overflow:"hidden",display:"flex",justifyContent:"center"}}>
            <div style={{width:"100%",maxWidth:L.isDesktop?900:"100%",display:"flex",flexDirection:"column",overflow:"hidden"}}>{ContentArea}</div>
          </div>
        </div>
      </div>
    );
  }

  return(
    <div style={{fontFamily:"'DM Sans',-apple-system,sans-serif",background:C.bg,color:C.t1,display:"flex",flexDirection:"column",height:"100dvh",overflow:"hidden",position:"fixed",inset:0}}>
      <div style={{background:C.navy,padding:"0 16px",display:"flex",alignItems:"center",gap:12,height:58,boxSizing:"border-box",flexShrink:0,boxShadow:"0 2px 16px rgba(13,17,23,0.25)"}}>
        {selItem&&<button onClick={()=>setSelItem(null)} style={{background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.15)",color:"#fff",cursor:"pointer",padding:"7px 12px",borderRadius:8,display:"flex",alignItems:"center",gap:5,fontSize:13,fontWeight:600,fontFamily:"inherit",flexShrink:0}}><ChevronLeft size={14} color="#fff"/>Volver</button>}
        {view==="dashboard"&&!selItem
          ?<div style={{flex:1,display:"flex",alignItems:"center",gap:10}}><LogoAldago height={36}/></div>
          :<div style={{flex:1,display:"flex",alignItems:"center",gap:8}}>
            <div style={{color:"#fff",fontSize:16,fontWeight:700,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{selItem?selItem.nombre:(titles[view]||"")}</div>
            {view==="solicitudes"&&!selItem&&pendingCount>0&&<span style={{background:C.red,color:"#fff",fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:10,flexShrink:0}}>{pendingCount}</span>}
          </div>
        }
        <div style={{display:"flex",gap:6,flexShrink:0}}>
          <DarkBtn invert/>
          <button onClick={()=>setScanning(true)} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.14)",borderRadius:8,cursor:"pointer",padding:8,display:"flex"}}><QrCode size={17} color="rgba(255,255,255,0.8)"/></button>
          <button onClick={()=>setSearch(true)} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.14)",borderRadius:8,cursor:"pointer",padding:8,display:"flex"}}><Search size={17} color="rgba(255,255,255,0.8)"/></button>
          <button onClick={()=>setRol(null)} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.14)",borderRadius:8,cursor:"pointer",padding:8,display:"flex"}} title="Salir"><LogOut size={17} color="rgba(255,255,255,0.8)"/></button>
        </div>
      </div>
      {ContentArea}
      <AppNav view={selItem?null:view} setView={goTo} pendingCount={pendingCount}/>
      {!anyModal&&!selItem&&(
        <button onClick={()=>setAdding(true)} style={{position:"fixed",bottom:"calc(68px + env(safe-area-inset-bottom, 0px))",right:16,width:50,height:50,borderRadius:14,background:C.navy,border:"none",cursor:"pointer",zIndex:60,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px rgba(28,20,117,0.4)",fontFamily:"inherit"}}>
          <Plus size={22} strokeWidth={2.5} color="#fff"/>
        </button>
      )}
    </div>
  );
}
