export default async function page(){
    await new Promise((resolve)=> setTimeout(resolve, 1000));
    return <div>Hello World</div>
}