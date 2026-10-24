import { useNavigate } from "react-router-dom";
import { useBookMutations } from "../hooks/useBookMutations.js";
import { useToast } from "../context/ToastContext.jsx";
import BookForm from "../components/BookForm.jsx";
import PageHeader from "../components/layout/PageHeader.jsx";

export default function BookNewPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { create, pending, error } = useBookMutations();

  const handleSubmit = async (values) => {
    try {
      const created = await create(values);
      showToast("책을 등록했습니다.");
      navigate(`/books/${created.id}`); // 성공 시 상세로 이동
    } catch {
      // 실패 시 이동하지 않고, error 가 폼 상단에 표시된다
    }
  };

  return (
    <>
      <PageHeader title="책 등록" description="읽은 책이나 읽고 싶은 책을 기록하세요." />
      <BookForm
        submitLabel="등록"
        submitting={pending}
        submitError={error}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </>
  );
}
