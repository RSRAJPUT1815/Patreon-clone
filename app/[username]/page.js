import Paymentpage from "@/components/Paymentpage"
import connectDB from "@/db/connectdb";
import { notFound } from "next/navigation"
import User from "@/models/User";


export default async function Username({params}) {
  const checkuser = async () => {
 
    await connectDB()
    //if username is not present in the database, show 404 page
   let u = await User.findOne({ username: params.username })
    if (!u) {
      return notFound()
    }
  }
  await checkuser()

  return (
    <>

      <Paymentpage username={params.username} />
    </>
  )
}

export async function generateMetadata({ params }) {
  return {
    title: `${params.username} - Get Me A Chai`,
  }
}

