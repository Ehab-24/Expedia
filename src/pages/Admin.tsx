import { useCookies } from "react-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import ContactsTable from "../components/Admin/ContactsTable";
import { Contact } from "../types";
import toast from "react-hot-toast";
import Header from '../components/Admin/Header'

const AdminPage = () => {
  const [cookies] = useCookies(["Authorization"]);
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const fetchContacts = async () => {
    setLoading(true);
    const res = await axios.get(`${import.meta.env.VITE_BASE_URI}/contacts`, {
      headers: {
        Authorization: cookies.Authorization,
      },
    });
    console.log(res.data);
    setContacts(res.data);
    setLoading(false);
  };

  async function deleteContact(id: string) {
    const res = await axios.delete(
      `${import.meta.env.VITE_BASE_URI}/contacts/${id}`,
      {
        headers: {
          Authorization: cookies.Authorization,
        },
      }
    );
    if (res.status === 200) {
      toast.success("Contact Info Deleted!");
    } else {
      toast.error("Unable to delete info");
    }
    fetchContacts()
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
    <Header />
      <div className="px-8 my-12 w-full">
        <ContactsTable contacts={contacts} onDelete={deleteContact} />
      </div>
    </div>
  );
};

export default AdminPage;
