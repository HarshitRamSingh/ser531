import { IntegratedQueryBuilder } from '../components/IntegratedQueryBuilder'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Integrated SPARQL Query Builder</h1>
          <IntegratedQueryBuilder />
        </div>
      </div>
    </main>
  )
}