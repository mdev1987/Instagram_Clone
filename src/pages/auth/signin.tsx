import Header from "@/components/Header"
import { GetServerSideProps } from "next"
import { BuiltInProviderType } from "next-auth/providers"
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react'
import Image from "next/image"
import InstagramBanner from '../../../public/assets/images/Instagram_Banner.png'
import Instagram from '../../../public/assets/images/Instagram.png'

type PropsType = {
    providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
}

export default function signin({ providers }: PropsType) {
    return (
        <>
            <Header />
            <div className="flex justify-center space-x-7 mt-20">
                <Image className="hidden object-cover rotate-6
                md:inline-flex md:w-48"
                    draggable={false}
                    src={InstagramBanner}
                    alt="Instagram" width={200} height={200} />
                <div className="">
                    {Object.values(providers).map(provider => (
                        <div key={provider.name}
                            className="flex flex-col items-center">
                            <Image src={Instagram} alt="Instagram"
                                width={200} height={200}
                                className="w-32 object-cover"
                                draggable={false}
                            />
                            <p className="text-sm my-5 text-center">
                                This app is created for learning purpose
                            </p>
                            <button onClick={() => signIn(provider.id,
                                { callbackUrl: '/' })}
                                className="bg-purple-500 rounded-lg 
                            p-3 text-white hover:bg-purple-600">
                                Sign in with {provider.name}
                            </button>
                        </div>))}
                </div>
            </div>
        </>
    )
}


export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {
            providers
        }
    }
}