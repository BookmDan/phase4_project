"""shoppingCart

Revision ID: c97365066f02
Revises: aae9e362d82c
Create Date: 2024-02-17 15:52:39.993138

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c97365066f02'
down_revision = 'aae9e362d82c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('shopping_cart',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('race_cost', sa.Float(), nullable=True),
    sa.Column('ship_packet_cost', sa.Float(), nullable=True),
    sa.Column('cart_items', sa.Integer(), nullable=True),
    sa.Column('tshirt_size', sa.String(), nullable=True),
    sa.Column('coupon_code', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_shopping_cart'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('shopping_cart')
    # ### end Alembic commands ###
