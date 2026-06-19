import express from 'express'
const router = express.Router()

const jadwalSalat = [
  { id: 1, waktu: 'Subuh', waktu_jam: '04:30', imam: 'Ustadz Ahmad', muadzin: 'Ali' },
  { id: 2, waktu: 'Dzuhur', waktu_jam: '12:00', imam: 'Ustadz Budi', muadzin: 'Rizki' },
  { id: 3, waktu: 'Ashar', waktu_jam: '15:15', imam: 'Ustadz Candra', muadzin: 'Fajar' },
  { id: 4, waktu: 'Maghrib', waktu_jam: '18:00', imam: 'Ustadz Dedi', muadzin: 'Hendra' },
  { id: 5, waktu: 'Isya', waktu_jam: '19:15', imam: 'Ustadz Eko', muadzin: 'Irwan' }
]

router.get('/', (req, res) => {
  res.json(jadwalSalat)
})

export default router
