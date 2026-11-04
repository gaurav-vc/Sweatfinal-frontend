import React from 'react';
import FoundingPassForm from './FoundingPassForm';

/**
 * SlotBookingWidget - Upgraded to Luxury High-Converting Lead Capture Form
 * Wired directly to Central SWEAT CRM Webhook:
 * https://api.sweatfitwellness.com/api/v1/webhooks/leads/sweat/
 */
export const SlotBookingWidget = (props) => {
  return <FoundingPassForm {...props} />;
};

export default SlotBookingWidget;
