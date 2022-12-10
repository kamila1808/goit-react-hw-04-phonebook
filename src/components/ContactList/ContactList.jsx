import PropTypes from 'prop-types';
import { ContactItem } from '../ContactItem/ContactItem';
import { ListItem, List } from './ContactList.styled';

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <List>
      {contacts.map(contact => {
        return (
          <ListItem key={contact.id}>
            <ContactItem contact={contact} deleteContact={deleteContact} />
          </ListItem>
        );
      })}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
