"""empty message

Revision ID: d7f380f4d91c
Revises: 3ceae1172fb7
Create Date: 2024-01-13 11:45:08.408108

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd7f380f4d91c'
down_revision = '3ceae1172fb7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('credit_card_info', schema=None) as batch_op:
        batch_op.alter_column('credit_card_number',
               existing_type=sa.VARCHAR(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('credit_card_info', schema=None) as batch_op:
        batch_op.alter_column('credit_card_number',
               existing_type=sa.VARCHAR(),
               nullable=False)

    # ### end Alembic commands ###
