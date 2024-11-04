class Producto {
    private codigo: number;
    public nombre: string;
    public precio: number;

    constructor(codigo : number, nombre: string, precio: number){
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
    }
    public getCode():number{
        return this.codigo;
    }
    public getNombre():string{
        return this.nombre;
    }
    public getPrecio(): number{
        return this.precio;
    }
    public setPrecio(newPrecio: number){
        this.precio = newPrecio;
    }

    public imprimir(): string{
        return this.codigo.toString()+' '+ this.nombre+' '+this.precio.toString;
    }
}

class MinHeap {
    private heap: Producto[]; // monticulo = heap
    private n: number; // n = numero de elementos

    constructor(size: number){
        this.heap = new Array(size+1)
        this.n = 0;
    }

    public checkMin(): string{
        return 'Codigo:' + this.heap[1].getCode() +' Precio:' +this.heap[1].getPrecio() +' Nombre:'+ this.heap[1].getNombre();
    }
    public checkMax(): string{
        return 'Codigo:' + this.heap[7].getCode() +' Precio:' +this.heap[7].getPrecio() +' Nombre:'+ this.heap[7].getNombre();
    }
    // public getMin(): Producto {
    //     let min: Producto = this.heap[1];
    //     this.heap[1] = this.heap[this.n];
    //     this.heap[this.n] = 0;
    //     this.n--;
    //     this.sink(1); 
    //     return min;
    // }
    

    public estaVacia():boolean{
        return this.n == 0;
    }

    public getTamanio(): number{
        return this.n;
    }

    public insert(producto: Producto){
        if(this.n == (this.heap.length -1)){
            this.resize(2 * this.heap.length);
        }
        this.n++; 
        this.heap[this.n] = producto;
        this.swap(this.n)
    }
    // intercambiar
    private swap(i: number): void{
        let father: number = Math.floor(i/2);
        while(i>1 && this.heap[father].getPrecio() > this.heap[i].getPrecio()){
            let temp: Producto = this.heap[father];
            this.heap[father] = this.heap[i];
            this.heap[i] = temp;
            i = father; // i = i/2
            father = Math.floor(i/2);
        }
    }

    private resize(newSize: number): void{
        let newHeap: Producto[] = new Array(newSize);
        for(let i = 0; i< this.heap.length; i++){
            newHeap[i] = this.heap[i];
        }
        this.heap = newHeap;
    }

    private sink(i: number): void {
        while (2*i <= this.n) {
            let j: number = 2*i; // empezamos asumiendo que el hijo izquierdo es el mayor
            if (j < this.n && this.heap[j] < this.heap[j+1])
                j++; // cambia a hijo derecho si este es el mayor
            if (this.heap[i] <= this.heap[j])
                break;
            // Hacemos intercambio burbuja entre los nodos para que el menor quede en la raíz
            let temp: Producto = this.heap[i];
            this.heap[i] = this.heap[j];
            this.heap[j] = temp;
            // verificamos si procede otro intercambio hacia abajo
            i = j;
        }
    }


    public setPrecio(ref: string, newPrecio: number){
        //let newHeap: Producto[] = new Array();
        for(let i = 0; i< this.heap.length; i++){
            if (ref == this.heap[i].getNombre()){
                this.heap[i].setPrecio(newPrecio);
            }
            // newHeap[i] = this.heap[i];
        }
        // this.heap = newHeap;
    }

}

// main
let prod1: Producto = new Producto(1, 'laptop', 20)
let prod2: Producto = new Producto(2, 'mouse', 15)
let prod3: Producto = new Producto(3, 'silla', 30)
let prod4: Producto = new Producto(4, 'teclado', 20)
let prod5: Producto = new Producto(5, 'cpu', 50)
let prod6: Producto = new Producto(6, 'pantalla', 50)
let prod7: Producto = new Producto(7, 'memoria',5)
let myHeap: MinHeap = new MinHeap(7);

myHeap.insert(prod1);
myHeap.insert(prod2);
myHeap.insert(prod3);
myHeap.insert(prod4);
myHeap.insert(prod5);
myHeap.insert(prod6);
myHeap.insert(prod7);
//myHeap.imprimir();
// Monticulo completo
console.log(myHeap);
//Consultar el precio mas bajo 

let minimo = myHeap.checkMin();
console.log('Precio Minimo',minimo);
//Consultar el precio mas Alto 
let max = myHeap.checkMax();
console.log('Precio Maximo', max);

//Actualizar precio
myHeap.setPrecio('pantalla', 500);