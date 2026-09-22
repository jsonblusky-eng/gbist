import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Programs from "./pages/Programs.jsx";
import ProgramDetail from "./pages/ProgramDetail.jsx";
import Admissions from "./pages/Admissions.jsx";
import Fees from "./pages/Fees.jsx";
import Faqs from "./pages/Faqs.jsx";
import Faculty from "./pages/Faculty.jsx";
// Gallery & Notices pages temporarily offline — imports kept for quick re-enable:
// import Gallery from "./pages/Gallery.jsx";
// import Notices from "./pages/Notices.jsx";
// import NoticeDetail from "./pages/NoticeDetail.jsx";
import Contact from "./pages/Contact.jsx";import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:slug" element={<ProgramDetail />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/faculty" element={<Faculty />} />
          {/* Gallery & Notices temporarily disabled — re-enable by uncommenting:
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/notices/:slug" element={<NoticeDetail />} />
          */}
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
